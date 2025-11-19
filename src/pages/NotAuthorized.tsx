import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="flex justify-center">
          <div className="p-6 bg-destructive/10 rounded-full">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Access Denied
        </h1>
        
        <p className="text-lg text-muted-foreground">
          You don't have permission to access the Admin Portal. This area is restricted to administrators and mentors only.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button onClick={() => navigate("/dashboard")} variant="default">
            Go to Dashboard
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
