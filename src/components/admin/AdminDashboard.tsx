
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ContactsManager from './ContactsManager';
import EstimatesManager from './EstimatesManager';
import ProjectsManager from './ProjectsManager';
import TasksManager from './TasksManager';
import QuotationsManager from './QuotationsManager';
import EmailQuotesManager from './EmailQuotesManager';
import AnalyticsOverview from './AnalyticsOverview';
import SettingsManager from './SettingsManager';
import AdminProfileSettings from './AdminProfileSettings';
import { 
  LogOut, 
  Users, 
  Calculator, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  Mail, 
  BarChart3, 
  Settings,
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of the admin panel",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-left">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="text-sm text-gray-500">Welcome back, {user?.name}</span>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 justify-start">
            <TabsTrigger value="analytics" className="flex items-center gap-2 justify-start">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2 justify-start">
              <Users className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="estimates" className="flex items-center gap-2 justify-start">
              <Calculator className="h-4 w-4" />
              Estimates
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 justify-start">
              <FolderOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2 justify-start">
              <CheckSquare className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="quotations" className="flex items-center gap-2 justify-start">
              <FileText className="h-4 w-4" />
              Quotations
            </TabsTrigger>
            <TabsTrigger value="email-quotes" className="flex items-center gap-2 justify-start">
              <Mail className="h-4 w-4" />
              Email Quotes
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 justify-start">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 justify-start">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="estimates">
            <EstimatesManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksManager />
          </TabsContent>

          <TabsContent value="quotations">
            <QuotationsManager />
          </TabsContent>

          <TabsContent value="email-quotes">
            <EmailQuotesManager />
          </TabsContent>

          <TabsContent value="profile">
            <AdminProfileSettings />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
