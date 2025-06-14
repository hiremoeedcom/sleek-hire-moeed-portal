
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface QuotationItemsManagerProps {
  items: QuotationItem[];
  onItemsChange: (items: QuotationItem[]) => void;
  currency: string;
}

const QuotationItemsManager = ({ items, onItemsChange, currency }: QuotationItemsManagerProps) => {
  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unit_price') {
          updatedItem.total = updatedItem.quantity * updatedItem.unit_price;
        }
        return updatedItem;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onItemsChange(items.filter(item => item.id !== id));
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Line Items</h3>
        <Button type="button" onClick={addItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-3 border rounded-lg">
            <div className="col-span-5">
              <Label htmlFor={`description-${item.id}`}>Description</Label>
              <Textarea
                id={`description-${item.id}`}
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                placeholder="Item description"
                rows={2}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
              <Input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`unit_price-${item.id}`}>Unit Price</Label>
              <Input
                id={`unit_price-${item.id}`}
                type="number"
                min="0"
                step="0.01"
                value={item.unit_price}
                onChange={(e) => updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="col-span-2">
              <Label>Total</Label>
              <div className="h-10 flex items-center font-medium">
                {currency} {item.total.toFixed(2)}
              </div>
            </div>
            <div className="col-span-1">
              {items.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-lg font-bold">
              Subtotal: {currency} {totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationItemsManager;
