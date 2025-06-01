
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building, User, Calendar, MessageSquare } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  created_at: string;
  notes?: string;
}

interface ContactDetailModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (contactId: string, newStatus: string) => void;
}

const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  contact,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  if (!contact) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Details - {contact.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex gap-2">
            <Badge className={getStatusColor(contact.status)}>
              {contact.status}
            </Badge>
            <Badge className={getPriorityColor(contact.priority)}>
              {contact.priority}
            </Badge>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Name:</span>
                  <span>{contact.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Phone:</span>
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Company:</span>
                    <span>{contact.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date(contact.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Subject and Message */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Message Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-sm text-gray-600">Subject:</span>
                  <p className="text-sm bg-gray-50 p-2 rounded mt-1">{contact.subject}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <h3 className="font-semibold text-lg">Full Message</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{contact.message}</p>
            </div>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Notes</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="whitespace-pre-wrap text-sm">{contact.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onStatusUpdate(contact.id, 'contacted')}
              disabled={contact.status === 'contacted'}
            >
              Mark Contacted
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onStatusUpdate(contact.id, 'qualified')}
              disabled={contact.status === 'qualified'}
            >
              Mark Qualified
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onStatusUpdate(contact.id, 'closed')}
              disabled={contact.status === 'closed'}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailModal;
