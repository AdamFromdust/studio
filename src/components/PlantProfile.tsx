"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PlantProfile = () => {
  const [orchidName, setOrchidName] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [orchids, setOrchids] = useState<
    { name: string; details: string; photos: string[] }[]
  >([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = () => {
    if (newPhoto) {
      setPhotos([...photos, newPhoto]);
      setNewPhoto(null);
    }
  };

  const addOrchid = () => {
    setOrchids([...orchids, { name: orchidName, details, photos }]);
    setOrchidName('');
    setDetails('');
    setPhotos([]);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Add New Orchid</h3>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="orchidName">Orchid Name</Label>
              <Input
                type="text"
                id="orchidName"
                placeholder="Orchid Name"
                value={orchidName}
                onChange={(e) => setOrchidName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Input
                type="text"
                id="details"
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <div>
              <Label>Add Photo</Label>
              <div className="flex items-center space-x-2">
                <Input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                <Label htmlFor="photo-upload" className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
                  Upload Photo
                </Label>
                <Button type="button" size="sm" onClick={addPhoto} disabled={!newPhoto}>Add</Button>
              </div>
              {newPhoto && <img src={newPhoto} alt="New Orchid" className="mt-2 max-h-40 rounded-md" />}
            </div>

            <Button onClick={addOrchid}>Add Orchid</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">My Orchids</h2>
        <div className="flex flex-wrap">
          {orchids.map((orchid, index) => (
            <Card key={index} className="w-64 m-2">
              <CardHeader>
                <h3 className="text-lg font-semibold">{orchid.name}</h3>
              </CardHeader>
              <CardContent>
                <p>{orchid.details}</p>
                <div className="flex overflow-x-auto mt-2">
                  {orchid.photos.map((photo, photoIndex) => (
                    <img key={photoIndex} src={photo} alt={orchid.name} className="max-h-20 rounded-md mr-2" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantProfile;
