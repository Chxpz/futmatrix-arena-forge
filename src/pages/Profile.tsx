
import { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

const profileFormSchema = z.object({
  nickname: z.string().min(3, "Nickname must be at least 3 characters").max(20, "Nickname cannot exceed 20 characters"),
  eaname: z.string().optional(),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Placeholder for user data - this would come from your backend/auth context
  const defaultValues: Partial<ProfileFormValues> = {
    nickname: '',
    eaname: '',
    bio: '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call - replace with your Supabase logic
      console.log("Profile data to save:", { ...data, avatar: avatarFile });
      
      // Simulating a successful update
      setTimeout(() => {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-gray-400 mt-1">Update your player profile and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main profile form */}
        <Card className="lg:col-span-2 bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
            <CardDescription>
              This information will be displayed publicly to other Futmatrix players
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-matrix-gray/20">
                  <div className="shrink-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarPreview || ''} />
                      <AvatarFallback className="bg-neon-green/20 text-neon-green text-2xl">
                        {form.getValues('nickname')?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <FormLabel className="text-sm">Profile Photo</FormLabel>
                    <FormDescription className="text-xs text-gray-400 mb-2">
                      Upload a photo to personalize your profile.
                    </FormDescription>
                    <div className="flex items-center">
                      <label 
                        htmlFor="avatar-upload" 
                        className="cursor-pointer flex items-center gap-1 px-3 py-2 border border-matrix-gray/30 rounded-md text-sm hover:bg-matrix-gray/20"
                      >
                        <Upload size={16} />
                        Upload Photo
                      </label>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange} 
                      />
                      {avatarFile && (
                        <span className="ml-3 text-xs text-gray-400 truncate">
                          {avatarFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your gamer tag" 
                          {...field}
                          className="bg-matrix-darker border-matrix-gray/30" 
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name for tournaments and leaderboards.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eaname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EA Name (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your EA account name" 
                          {...field}
                          className="bg-matrix-darker border-matrix-gray/30" 
                        />
                      </FormControl>
                      <FormDescription>
                        Add your EA account name to help opponents find you in-game.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="A short bio about yourself as a player"
                          {...field}
                          className="w-full p-3 rounded-md bg-matrix-darker border border-matrix-gray/30 focus:outline-none focus:ring-2 focus:ring-neon-green/50 resize-none h-24"
                        />
                      </FormControl>
                      <FormDescription>
                        Tell other players about your gaming style and achievements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="bg-neon-green text-black hover:bg-neon-green/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Stats card */}
        <div className="space-y-6">
          <Card className="bg-matrix-dark border-matrix-gray/30">
            <CardHeader>
              <CardTitle>Player Metrics</CardTitle>
              <CardDescription>Your performance statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Win Rate</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-matrix-gray/20 rounded-full h-2.5">
                    <div className="bg-neon-green h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">65%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Goals per Match</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-matrix-gray/20 rounded-full h-2.5">
                    <div className="bg-neon-blue h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">2.4</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Pass Accuracy</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-matrix-gray/20 rounded-full h-2.5">
                    <div className="bg-neon-yellow h-2.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">88%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-400">
                All metrics are calculated based on your last 20 matches
              </p>
            </CardFooter>
          </Card>
          
          <Card className="bg-matrix-dark border-matrix-gray/30">
            <CardHeader>
              <CardTitle>Match History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded-md text-sm flex justify-between items-center ${
                    i % 3 === 0 ? 'bg-green-900/20 text-green-400' : 
                    i % 3 === 1 ? 'bg-red-900/20 text-red-400' : 
                    'bg-matrix-gray/20 text-gray-400'
                  }`}
                >
                  <span>vs Player{i + 1}</span>
                  <span>
                    {i % 3 === 0 ? 'Win' : i % 3 === 1 ? 'Loss' : 'Draw'} 
                    {' '}{Math.floor(Math.random() * 5)}-{Math.floor(Math.random() * 3)}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-matrix-gray/30 hover:bg-matrix-gray/20"
              >
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
