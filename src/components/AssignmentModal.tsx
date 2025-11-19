import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "employee" | "mentor";
}

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
}

export const AssignmentModal = ({ isOpen, onClose, moduleTitle }: AssignmentModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users data
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "employee" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "employee" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "mentor" },
    { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "employee" },
    { id: "5", name: "Tom Brown", email: "tom@example.com", role: "mentor" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAssign = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }
    toast.success(`Assigned "${moduleTitle}" to ${selectedUsers.length} user(s)`);
    setSelectedUsers([]);
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-white/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Assign Module
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Assign "{moduleTitle}" to employees and mentors
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Users</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* User List */}
          <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4 bg-muted/30">
            {filteredUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No users found
              </p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-colors border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                    />
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "mentor"
                        ? "bg-purple-500/10 text-purple-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Selected Count */}
          {selectedUsers.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {selectedUsers.length} user(s) selected
            </p>
          )}
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAssign}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            Assign to Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
