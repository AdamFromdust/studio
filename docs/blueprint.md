# **App Name**: Orchid Care AI

## Core Features:

- Knowledgebase: Browse the orchid knowledgebase. This will be rendered in a wiki-like format.
- Plant Profile: Add new plants to your profile with details and a photo gallery.
- Care Logging: Log care activities like watering, fertilizing, and notes for each plant.
- AI Recommendations: Receive AI-driven recommendations regarding watering, fertilizing, and problem identification based on care logs and notes. The AI should act as a tool, deciding when to incorporate relevant information in its output.
- AI Help: Get AI-powered help by uploading plant problem pictures or product images for analysis. The AI should act as a tool, deciding when to incorporate relevant information in its output.

## Style Guidelines:

- Primary color: White or light gray for a clean and calming feel.
- Secondary color: Natural green (#4CAF50) to represent plant life and health.
- Accent: Teal (#008080) for interactive elements and highlights.
- Clean and modern typography for easy readability.
- Use clear and intuitive icons to represent different care activities and plant attributes.
- Clean and organized layout with a focus on visual clarity.

## Original User Request:
I will post a features list of MVP of my app and technical  documentation. Implement all the features.   =======================================================# Features

* Guide  
  * knowledgebase   
    * “Cultivating Vanda Orchids Indoors: A Botanical Guide to Understanding and Success”  
  * browsable in app in a wiki-like format  
* My plant profile  
  * add a new plant  
  * details  
  * photo gallery  
* Care logging  
  * watering  
  * fertilizing  
  * note  
* AI recommendation  
  * not watering/fertilizing enough  
  * comment if there is a problem in note  
* AI help  
  * RAG response  
  * upload picture of plant problem  
  * upload picture of product to determine if its good  
* Can be accessed on web and mobile ========================================================

# **. Technology Stack**

* **Frontend:**  
  * **Framework:** React Native  
  * **UI Generation:** Locofy.ai (from Figma/XD designs)  
  * *Rationale:* React Native allows for cross-platform mobile app development (iOS, Android) using React. Locofy.ai accelerates frontend development by converting designs directly into initial React Native UI code, ensuring design fidelity and reducing manual UI coding time.  
  * For simple/standardized use cases like login we let the AI code generator create UI.  
  * If there are no UI designs the code generator should generate the UI based on its best guess.  
* **Backend:** Firebase Serverless Platform  
  * **Services:** Firebase Authentication, Cloud Firestore, Cloud Storage for Firebase, Firebase Cloud Functions (Node.js runtime).  
  * *Rationale:* Firebase provides a managed, scalable backend infrastructure, simplifying development by handling authentication, database management, file storage, and serverless compute. This allows the team to focus on application features. Its integration with Google Cloud and AI services is beneficial.  
* **AI Orchestration:** Genkit (Node.js)  
  * **AI Model:** Google Gemini API (via Genkit plugins)  
  * *Rationale:* Genkit is an open-source framework from Google designed to build, deploy, and monitor production-ready AI features. It integrates well with the Firebase/Google Cloud ecosystem, supports Gemini models, and provides tooling for development and observability. Using Genkit (likely within Cloud Functions) provides a structured way to implement the required AI logic (RAG, recommendations, image analysis).
==========================================================
# **. System Architecture**

The high-level architecture involves the following flow:

1. **User Interaction:** The user interacts with the React Native application (UI potentially generated initially by Locofy.ai) on their mobile device or web browser.  
2. **Frontend Logic:** React Native handles UI rendering, state management, navigation, and user input.  
3. **Firebase Interaction (Client-Side):**  
   * The React Native app uses the Firebase SDK to interact directly with Firebase Authentication for login/signup.  
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
  