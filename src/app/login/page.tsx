"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic authentication logic (replace with your actual authentication)
    if (username === 'user' && password === 'password') {
      // Store authentication status (e.g., using cookies or local storage)
      // For simplicity, we'll just redirect
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <h3 className="text-lg font-semibold">Login</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
