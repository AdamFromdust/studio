# **Technical Documentation: NV App \- VS MVP Care Milestone**

Version: 1.10  
Date: April 15, 2025

# **1\. Introduction**

This document outlines the technical specifications, architecture, and implementation plan for the "VS MVP \- Care" milestone of the NV App. The primary goal of this milestone is to deliver core plant care functionalities, establish the foundational architecture, and provide a usable experience on both web and mobile platforms. This document reflects the chosen technology stack aimed at balancing development speed, scalability, and AI capabilities.

**Guiding Principle:** A core guiding principle for this project is to leverage the Firebase and Google Cloud ecosystem whenever feasible. This aims to maximize integration, benefit from managed services, and potentially simplify development and operations by utilizing tools, products, and services from Google and Firebase preferentially.

# **2\. Technology Stack**

* **Frontend:**  
  * **Framework:** React Native  
  * **UI Generation:** Locofy.ai (from Figma/XD designs)  
  * **Authentication UI:** FirebaseUI (via native SDK integration or compatible libraries)  
  * *Rationale:* React Native allows for cross-platform mobile app development (iOS, Android) using React. Locofy.ai accelerates frontend development by converting designs directly into initial React Native UI code. FirebaseUI can simplify the implementation of authentication flows. Aligns with the principle of using Firebase/Google tools where possible.  
* **Backend:** Firebase Serverless Platform  
  * **Services:** Firebase Authentication, Cloud Firestore, Cloud Storage for Firebase, Firebase Cloud Functions (Node.js runtime).  
  * *Rationale:* Firebase provides a managed, scalable backend infrastructure, simplifying development by handling authentication, database management, file storage, and serverless compute. This allows the team to focus on application features. Its integration with Google Cloud and AI services is beneficial and aligns with the guiding principle.  
* **AI Orchestration:** Genkit (Node.js)  
  * **AI Model:** Google Gemini API (via Genkit plugins)  
  * *Rationale:* Genkit is an open-source framework from Google designed to build, deploy, and monitor production-ready AI features. It integrates well with the Firebase/Google Cloud ecosystem, supports Gemini models, and provides tooling for development and observability. Using Genkit (likely within Cloud Functions) provides a structured way to implement the required AI logic (RAG, recommendations, image analysis) and aligns with the guiding principle.

# **3\. Milestone Goals: "VS MVP \- Care" Features**

This milestone will implement the following features as defined in the project overview:

* **Guide/Knowledgebase:** A browsable in-app guide containing plant care information.  
* **My Plant Profile:**  
  * Display date plant was added.  
  * Allow users to add/edit a plant biography.  
  * Implement a photo gallery for each plant.  
* **Care Logging:**  
  * Functionality to log watering events.  
  * Functionality to log fertilizing events.  
  * Ability to add free-text notes to logs.  
* **AI Recommendation:**  
  * Analyze logs to suggest if watering/fertilizing is sufficient.  
  * Analyze user notes for potential problems.  
* **AI Help:**  
  * **RAG Response:** Answer user questions based on the Guide/Knowledgebase using Retrieval-Augmented Generation.  
  * **Image Analysis:** Allow users to upload images of plant problems or products for AI analysis.  
* **Positive Feedback:** Generate encouraging messages based on user care actions.  
* **Platform Access:** Ensure basic functionality is accessible via both web (using React Native for Web or responsive design) and native mobile apps (iOS/Android via React Native).

*(Note: Expert Review, advanced Social features, and Crypto/NFT features are out of scope for this specific milestone).*

# **4\. System Architecture**

The high-level architecture involves the following flow:

1. **User Interaction:** The user interacts with the React Native application (UI potentially generated initially by Locofy.ai) on their mobile device or web browser.  
2. **Frontend Logic:** React Native handles UI rendering, state management, navigation, and user input.  
3. **Firebase Interaction (Client-Side):**  
   * The React Native app uses the Firebase SDK and potentially FirebaseUI libraries/integrations for Authentication flows.  
   * It reads/writes data directly to Cloud Firestore for profiles, logs, etc. (secured by Security Rules).  
   * It uploads/downloads images directly to/from Cloud Storage (secured by Security Rules).  
4. **AI Feature Trigger:** For AI tasks (Recommendations, RAG, Image Analysis), the React Native app triggers backend logic, likely by calling Firebase Cloud Functions via HTTPS requests or Firestore triggers.  
5. **Backend AI Logic (Cloud Functions \+ Genkit):**  
   * Firebase Cloud Functions (running Node.js) host the Genkit flows.  
   * Genkit orchestrates the AI logic:  
     * Receives requests from the frontend.  
     * Uses appropriate Genkit plugins (@genkit-ai/googleai or @genkit-ai/vertexai) to interact with the Gemini API.  
     * Implements RAG logic using Genkit retrievers/indexers for AI Help.  
     * Processes input data (logs, images, text) for recommendations and analysis.  
     * Formats prompts and handles responses from Gemini.  
   * Genkit flows return results to the calling Cloud Function endpoint.  
6. **Response to Frontend:** The Cloud Function sends the AI-generated response back to the React Native app, which displays it to the user.

# **5\. Component Details**

## **5.1 Frontend (React Native \+ Locofy.ai)**

* **UI Approach:**  
  * **Initial Generation:** Locofy.ai (a third-party tool) will be used to convert finalized Figma/XD designs into initial React Native UI component code, accelerating the setup of screens and basic elements.  
  * **Authentication UI:** Pre-built authentication flows (sign-in/sign-up screens) will be implemented using **FirebaseUI** where possible (e.g., via react-native-firebaseui-auth or integrating native FirebaseUI SDKs) to leverage standardized, secure flows from the Firebase ecosystem.  
  * **Standard Components:** For general UI elements not covered by FirebaseUI Auth (buttons, inputs, lists, cards, etc.), the app will utilize:  
    * Core React Native components (View, Text, Pressable, TextInput, FlatList, etc.).  
    * Components generated or refined from the Locofy.ai output.  
    * Custom-built React Native components as needed.  
    * Styling for core and custom components should aim to align with Google's **Material Design** principles for visual consistency within the broader ecosystem.  
    * (Optional) Components from a general-purpose third-party UI library like React Native Paper (which implements Material Design 3\) could be considered later if needed.  
  * **Refinement:** Manual refinement and further componentization of Locofy-generated code will be necessary to integrate logic and ensure maintainability.  
* **Core Libraries:** React, React Native, React Navigation (standard for RN navigation).  
* **State Management:** Start with React's built-in hooks (useState, useContext). Evaluate standard libraries like Zustand or Redux Toolkit if state complexity increases significantly.  
* **Firebase SDK:** Integrate official Firebase SDK packages (likely via @react-native-firebase/app, @react-native-firebase/auth, etc.) for direct interaction with Firebase services.  
* **Device Features:** Utilize standard community packages like react-native-camera or react-native-image-picker for accessing the camera/gallery for image uploads.  
* **API Calls:** Use built-in fetch or standard libraries like axios to communicate with Firebase Cloud Functions hosting Genkit flows.

## **5.2 Backend (Firebase Serverless)**

* **Authentication:** Standard Firebase Auth implementation (Email/Password, potentially Google Sign-In), managed via Firebase console and interacted with via Firebase SDK / FirebaseUI on the frontend. User UID used as the primary key for user-specific data.  
* **Cloud Firestore:**  
  * NoSQL database for storing structured application data (see Data Model below).  
  * Leverage real-time listeners (onSnapshot) where appropriate for live data updates in the app.  
  * Implement robust **Firestore Security Rules** to ensure users can only access/modify their own data or data explicitly shared with them.  
* **Cloud Storage:**  
  * Store user-uploaded images in designated buckets (e.g., user-uploads/{userID}/plant-images/).  
  * Implement **Storage Security Rules** to control access based on authentication status and ownership.  
* **Cloud Functions (Node.js):**  
  * Host Genkit flows exposed as HTTPS endpoints for AI logic.  
  * Potentially use Firestore triggers (e.g., onWrite to CareLogs) to initiate background AI processing via Genkit.  
  * Environment variables used for managing API keys (e.g., Google AI API Key for Genkit), ideally stored in Google Secret Manager.

## **5.3 AI (Genkit \+ Gemini)**

* **Runtime:** Genkit flows implemented in Node.js, deployed to Firebase Cloud Functions.  
* **Core Genkit Usage:**  
  * **genkit()**: Initialize Genkit with necessary plugins (e.g., @genkit-ai/googleai for Gemini API access via Google AI, @genkit-ai/google-cloud for monitoring).  
  * **defineFlow()**: Define main entry points for AI features callable via Cloud Functions. Input/output schemas defined using Zod (standard schema validation library) for type safety.  
  * **generate()**: Core function to interact with Gemini models via configured plugins. Used for recommendations, image analysis prompts, and final RAG answer generation.  
  * **Prompt Management:** Utilize .prompt files or inline templates within flows for clarity and maintainability.  
  * **RAG Implementation:**  
    * Use Genkit embedders (e.g., Gemini embeddings via @genkit-ai/googleai or @genkit-ai/vertexai) and indexers/retrievers.  
    * For the vector store, start with Genkit's local development store (@genkit-ai/dev-local-vectorstore) or prioritize Google Cloud options like **Vertex AI Vector Search** for scalability and ecosystem alignment when moving beyond local testing.  
    * Structure RAG logic within a dedicated Genkit flow to query the knowledgebase (Guide content).  
  * **Image Analysis:** Pass image data (e.g., GCS URI or base64) to the Gemini multimodal model via the generate() function within a specific flow.  
  * **Monitoring:** Leverage @genkit-ai/google-cloud plugin to automatically send traces and metrics to Google Cloud / Firebase console for production monitoring.  
* **Alternative for AI Help (RAG): Vertex AI Search**  
  * **Summary:** Vertex AI Search is a managed Google Cloud service specifically designed for creating search and conversational AI (RAG) experiences over indexed data (like our Guide). Aligns with the guiding principle.  
  * **Comparison:**  
    * **Pros:** Potentially simpler setup for the RAG feature, less code to write for indexing/retrieval, managed infrastructure.  
    * **Cons:** Less fine-grained control over the RAG components (embedding model, chunking, retrieval logic) compared to building it with Genkit. Has its own pricing model based on queries and indexing.  
  * **Decision:** While Vertex AI Search could replace the custom RAG implementation within Genkit, this project will proceed with the Genkit approach for RAG to maintain consistency within the Genkit framework for all AI features and retain full control over the RAG pipeline components. Vertex AI Search remains a potential alternative if the custom RAG implementation proves too complex or difficult to manage.  
* **Alternative for AI Help (Conversational): Dialogflow CX**  
  * **Summary:** Dialogflow CX is Google Cloud's platform for building advanced conversational agents (chatbots/voice bots). It uses a visual flow builder and manages conversation state, intents, and can connect to knowledge bases (like our Guide) to answer questions. Aligns with the guiding principle.  
  * **Comparison:**  
    * **Pros:** Powerful for complex, multi-turn conversations; visual design interface; built-in state management and intent handling.  
    * **Cons:** Introduces another major platform to learn and integrate; potentially fragments AI logic if Genkit handles other tasks; may be overkill for the MVP's primarily RAG-based Q\&A needs.  
  * **Decision:** For the MVP scope focused on RAG Q\&A, implementing directly within Genkit maintains stack consistency. Dialogflow CX could be considered for future iterations if highly complex, stateful conversational flows become a requirement beyond simple RAG.

# **6\. Data Model (Firestore \- Simplified)**

* **users** collection:  
  * Doc ID: userID (from Firebase Auth)  
  * Fields: email, displayName, createdAt, etc.  
* **plants** collection:  
  * Doc ID: Auto-generated  
  * Fields: ownerId (string, maps to userID), name (string), bio (string), dateAdded (timestamp), photoUrls (array of strings \- URLs from Cloud Storage).  
* **careLogs** collection:  
  * Doc ID: Auto-generated  
  * Fields: plantId (string, maps to plant Doc ID), ownerId (string), logDate (timestamp), eventType (string \- 'watering', 'fertilizing', 'note'), notes (string, optional), aiRecommendation (string, optional).  
* **guide** collection: (For RAG knowledgebase)  
  * Doc ID: Auto-generated or semantic ID  
  * Fields: title (string), content (string \- markdown or plain text), tags (array of strings, optional).

# **7\. Key Workflows**

## **7.1 Care Logging & Recommendation**

1. **Frontend (React Native):** User selects plant, inputs care log details (type, notes), taps 'Save'.  
2. **Frontend:** App writes new document to careLogs collection in Firestore using Firebase SDK.  
3. **Backend (Trigger \- Optional):** A Firestore trigger on careLogs activates a Cloud Function.  
4. **Backend (Cloud Function):**  
   * Function receives log data.  
   * Calls a Genkit recommendationFlow.  
   * recommendationFlow formats data, calls Gemini via generate() to get analysis/recommendation.  
   * Function updates the corresponding careLogs document in Firestore with the aiRecommendation.  
5. **Frontend:** (If using real-time listener) App UI updates automatically to show the recommendation.

## **7.2 AI Help (RAG)**

1. **Frontend (React Native):** User types question into AI Help interface, taps 'Ask'.  
2. **Frontend:** App makes HTTPS call to a specific Cloud Function endpoint, sending the question.  
3. **Backend (Cloud Function):**  
   * HTTPS Function receives the question.  
   * Calls a Genkit ragHelpFlow.  
   * ragHelpFlow uses Genkit embedder/retriever to find relevant chunks from the indexed guide content.  
   * Formats a prompt including the question and retrieved context.  
   * Calls Gemini via generate() to synthesize an answer.  
   * Function returns the generated answer in the HTTPS response.  
4. **Frontend:** App receives the response and displays the answer.

## **7.3 AI Help (Image Analysis)**

1. **Frontend (React Native):** User selects/takes photo, adds optional text prompt (e.g., "What's wrong?"), taps 'Analyze'.  
2. **Frontend:** App uploads image to Cloud Storage using Firebase SDK, gets the download URL (or GCS URI).  
3. **Frontend:** App makes HTTPS call to a specific Cloud Function endpoint, sending the image URL/URI and text prompt.  
4. **Backend (Cloud Function):**  
   * HTTPS Function receives image reference and text prompt.  
   * Calls a Genkit imageAnalysisFlow.  
   * imageAnalysisFlow prepares multimodal input (text \+ image reference).  
   * Calls the Gemini multimodal model via generate().  
   * Function returns the generated analysis in the HTTPS response.  
5. **Frontend:** App receives the response and displays the analysis.

# **8\. Security Considerations**

* **Authentication:** All user-specific actions must be protected, requiring a valid Firebase Auth token. Use FirebaseUI for standardized flows where possible.  
* **Firestore Rules:** Implement granular rules ensuring users can only read/write their own plants and careLogs. Access to the guide collection might be public read. Rules must prevent unauthorized access or modification.  
* **Storage Rules:** Ensure users can only upload to their designated paths and read images they own or that are publicly accessible (if applicable).  
* **Cloud Functions:** Secure HTTPS endpoints, potentially using Firebase App Check or checking Auth tokens within the function, to prevent unauthorized invocation.  
* **API Keys:** Store Google AI/Gemini API keys securely using **Google Secret Manager** accessed by Cloud Functions, not embedded in client code.

# **9\. Future Considerations (Out of Scope for MVP Care)**

* Implementation of Expert Review feature, including payment integration (potentially using Google Pay API).  
* Development of Social features (profiles, chat, competitions).  
* Integration of Crypto/NFT features.  
* Advanced notification system (push notifications via **Firebase Cloud Messaging (FCM)**).  
* More sophisticated state management solutions if needed.  
* Offline data synchronization strategies beyond Firestore's basic caching.

# **10\. Relevant Google Cloud / Firebase Ecosystem Components for MVP**

This section summarizes the key Google Cloud, Firebase, and related ecosystem components relevant to building the MVP Care milestone, based on the chosen architecture and guiding principle.

* **Core Firebase Services (Build Products):**  
  * Firebase Authentication: Essential for user login/signup. FirebaseUI libraries/integrations are planned for simplifying authentication flows.  
  * Cloud Firestore: The primary NoSQL database for storing user profiles, plant data, care logs, and the guide content.  
  * Cloud Storage for Firebase: Used for storing user-uploaded images (plant photos, problem/product images).  
* **Compute/Serverless:**  
  * Cloud Functions for Firebase: The chosen platform to host backend Genkit AI logic, running Node.js. Enables serverless execution triggered by HTTPS requests or Firebase events.  
* **Artificial Intelligence Platform & Frameworks:**  
  * Vertex AI / Google AI: The underlying Google Cloud platform providing access to the Gemini API models (multimodal, text generation, embeddings) required for the AI features.  
  * Genkit: The open-source framework from Google used to orchestrate interactions with the Gemini API, structure AI logic into flows, manage prompts, and implement the RAG pipeline.  
* **Management & Setup (Google Cloud):**  
  * Billing: Essential for monitoring usage against free tier quotas and managing costs if usage scales.  
  * IAM & Admin: Required for managing permissions and service accounts, ensuring Cloud Functions have appropriate access to other services (Firestore, Storage, Gemini API).  
  * APIs & Services: Necessary for enabling the specific Google Cloud APIs required by Firebase, Vertex AI, Cloud Functions, etc.  
  * Secret Manager (Recommended): The preferred method for securely storing sensitive information like the Gemini API key accessed by Cloud Functions.  
* **Observability (Google Cloud):**  
  * Cloud Logging: For capturing and viewing logs generated by Cloud Functions and Genkit flows, crucial for debugging.  
  * Cloud Monitoring: For tracking performance metrics (latency, error rates, resource usage) of Cloud Functions.  
  * Cloud Trace: For analyzing request latency across distributed services (e.g., Frontend \-\> Function \-\> Gemini), integrated with Genkit via @genkit-ai/google-cloud plugin.  
  * Error Reporting: For aggregating and analyzing errors occurring in Cloud Functions.  
* **Security (Firebase/Google Cloud):**  
  * App Check (Recommended): Helps protect backend resources (Cloud Functions, Firestore, Storage) by verifying requests originate from the authentic app instance.  
* **Development Tools & Processes:**  
  * Firebase Hosting (Optional): Could be used if a web frontend (e.g., React Native for Web) is deployed alongside the mobile app.  
  * Gemini Code Assist (Optional but Recommended): AI coding assistant for IDEs (like VS Code) to accelerate React Native and Node.js development. *Note: Enterprise versions may offer enhanced suggestions by analyzing your connected codebase (e.g., from GitHub).* Setup instructions: [*https://cloud.google.com/gemini/docs/discover/set-up-gemini?\_gl=11pcud45\_gaNDEyNjUxNjczLjE3Mzg5MzExNjg.\_ga\_WH2QY8WWF5\*MTc0NDY0NzA0MC41LjEuMTc0NDY1MDc1MS41OC4wLjA.*](https://cloud.google.com/gemini/docs/discover/set-up-gemini?_gl=1*1pcud45*_ga*NDEyNjUxNjczLjE3Mzg5MzExNjg.*_ga_WH2QY8WWF5*MTc0NDY0NzA0MC41LjEuMTc0NDY1MDc1MS41OC4wLjA.)  
  * Cloud Build (Optional): Can automate the build and deployment process for Cloud Functions (Google Cloud native CI/CD).  
  * Artifact Registry (Optional): Stores build artifacts (like container images) used by Cloud Build (Google Cloud native registry).  
  * Locofy.ai (Third-Party): Used in the initial design-to-code phase for generating React Native UI components from Figma/XD.  
* **Potentially Useful Firebase Extensions:**  
  * Resize Images: Could automatically create thumbnails or resize user-uploaded images in Cloud Storage to optimize storage and loading times (aligns with using managed solutions).  
  * Sync Firestore User Data (Minor Convenience): Could automate creating a Firestore user profile document when a user signs up via Firebase Auth.  
  * *(Note: Search extensions like Algolia/Typesense exist but represent an alternative RAG approach, not used in the primary plan).*  
* **Relevant Firebase Solution Patterns:**  
  * The overall stack embodies patterns like "Build Apps Faster" (using Firebase BaaS) and "Add AI Capabilities" (integrating Genkit/Gemini with Cloud Functions).  
* **Alternative AI Implementation Tools (Not Used in Primary Plan):**  
  * Vertex AI Search: Managed Google Cloud service alternative for the RAG feature.  
  * Dialogflow CX: Google Cloud platform alternative for building the conversational AI Help feature, especially if complex dialogue flows are needed.

*(This list covers the main components relevant to the MVP based on the chosen architecture. Many other Google Cloud services exist but are not directly required for this specific implementation).*

