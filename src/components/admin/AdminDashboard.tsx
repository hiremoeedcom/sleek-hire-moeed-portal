
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ContactsManager from './ContactsManager';
import EstimatesManager from './EstimatesManager';
import QuotationsManager from './QuotationsManager';
import { LogOut, Users, Calculator, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('contacts');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage contacts, estimates, and quotations</p>
            </div>
            <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="estimates" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Estimates
            </TabsTrigger>
            <TabsTrigger value="quotations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quotations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="estimates">
            <EstimatesManager />
          </TabsContent>

          <TabsContent value="quotations">
            <QuotationsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
