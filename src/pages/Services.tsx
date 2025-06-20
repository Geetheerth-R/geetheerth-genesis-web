
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, DollarSign, LogOut, User, Send } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState({
    booking_date: "",
    booking_time: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchServices();
  }, [user, navigate]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingData({
      booking_date: "",
      booking_time: "",
      notes: ""
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !user) return;
    
    if (!bookingData.booking_date || !bookingData.booking_time) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    try {
      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          service_id: selectedService.id,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          notes: bookingData.notes
        });

      if (bookingError) throw bookingError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          user_email: user.email,
          user_name: user.user_metadata?.full_name || 'User',
          service_name: selectedService.name,
          service_price: selectedService.price,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          notes: bookingData.notes
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw here - booking was successful even if email failed
      }

      toast({
        title: "Booking Confirmed!",
        description: "Your service has been booked successfully. You'll receive a confirmation email shortly."
      });

      setSelectedService(null);
      setBookingData({
        booking_date: "",
        booking_time: "",
        notes: ""
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to book the service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tech-blue mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto">
          {/* User Info Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-tech-blue" />
              <div>
                <h1 className="text-2xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
                <p className="text-muted-foreground">Choose a service to get started</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="border-tech-red text-tech-red hover:bg-tech-red/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {selectedService ? (
            /* Booking Form */
            <div className="max-w-2xl mx-auto">
              <Card className="bg-dark-100 border-dark-300">
                <CardHeader>
                  <CardTitle className="text-tech-cyan">Book Service: {selectedService.name}</CardTitle>
                  <CardDescription>
                    Price: ${selectedService.price} | Duration: {selectedService.duration_hours} hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Calendar className="inline mr-2 h-4 w-4" />
                          Preferred Date
                        </label>
                        <Input
                          type="date"
                          value={bookingData.booking_date}
                          onChange={(e) => setBookingData(prev => ({ ...prev, booking_date: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-dark-200 border-dark-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Clock className="inline mr-2 h-4 w-4" />
                          Preferred Time
                        </label>
                        <Input
                          type="time"
                          value={bookingData.booking_time}
                          onChange={(e) => setBookingData(prev => ({ ...prev, booking_time: e.target.value }))}
                          className="bg-dark-200 border-dark-300"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Additional Notes (Optional)
                      </label>
                      <Textarea
                        value={bookingData.notes}
                        onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any specific requirements or details about your project..."
                        rows={4}
                        className="bg-dark-200 border-dark-300"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90"
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Booking...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Book Service
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedService(null)}
                        className="border-gray-500"
                      >
                        Back to Services
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Services Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-dark-100 border-dark-300 hover:border-tech-blue transition-colors">
                  <CardHeader>
                    <CardTitle className="text-tech-cyan">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-tech-green">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span className="text-xl font-bold">${service.price}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{service.duration_hours} hours</span>
                      </div>
                      <Button
                        onClick={() => handleServiceSelect(service)}
                        className="w-full bg-gradient-to-r from-tech-blue to-tech-purple hover:opacity-90"
                      >
                        Book This Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
