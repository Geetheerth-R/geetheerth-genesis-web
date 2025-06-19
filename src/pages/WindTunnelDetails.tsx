
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Plus, Image, Video, Type } from "lucide-react";
import { useState } from "react";

const WindTunnelDetails = () => {
  const [content, setContent] = useState([
    {
      id: 1,
      type: "text",
      content: "This is a placeholder text section. You can edit this to add details about your Wind Tunnel project."
    },
    {
      id: 2,
      type: "image",
      content: "/lovable-uploads/4948655f-5031-44b2-995f-3c0ebf26010f.png",
      alt: "Wind Tunnel Project"
    }
  ]);

  const addTextSection = () => {
    const newId = Math.max(...content.map(c => c.id)) + 1;
    setContent([...content, {
      id: newId,
      type: "text",
      content: "New text section. Click to edit."
    }]);
  };

  const addImageSection = () => {
    const newId = Math.max(...content.map(c => c.id)) + 1;
    setContent([...content, {
      id: newId,
      type: "image",
      content: "/placeholder.svg",
      alt: "Upload your image"
    }]);
  };

  const addVideoSection = () => {
    const newId = Math.max(...content.map(c => c.id)) + 1;
    setContent([...content, {
      id: newId,
      type: "video",
      content: "",
      alt: "Add video URL"
    }]);
  };

  const updateContent = (id: number, newContent: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, content: newContent } : item
    ));
  };

  const removeContent = (id: number) => {
    setContent(content.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <a href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </a>
            </Button>
            
            <h1 className="text-4xl font-bold mb-4 text-tech-blue">Wind Tunnel Project</h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive aerodynamics testing device for aircraft validation
            </p>
          </div>

          {/* Content Management Tools */}
          <div className="bg-dark-100 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Add Content</h3>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={addTextSection} variant="outline" size="sm">
                <Type className="mr-2 h-4 w-4" />
                Add Text
              </Button>
              <Button onClick={addImageSection} variant="outline" size="sm">
                <Image className="mr-2 h-4 w-4" />
                Add Image
              </Button>
              <Button onClick={addVideoSection} variant="outline" size="sm">
                <Video className="mr-2 h-4 w-4" />
                Add Video
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Note: This is a demo interface. In a real implementation, you would need a content management system to save these changes.
            </p>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-8">
            {content.map((item) => (
              <div key={item.id} className="bg-card p-6 rounded-lg relative group">
                <Button
                  onClick={() => removeContent(item.id)}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </Button>

                {item.type === "text" && (
                  <div>
                    <textarea
                      value={item.content}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      className="w-full min-h-[100px] p-3 bg-background border rounded-md resize-vertical"
                      placeholder="Enter your text content here..."
                    />
                  </div>
                )}

                {item.type === "image" && (
                  <div className="text-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                      <img 
                        src={item.content} 
                        alt={item.alt}
                        className="mx-auto max-w-full h-auto rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      placeholder="Enter image URL or upload path"
                      className="w-full p-2 bg-background border rounded-md"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Replace the URL above with your image path after uploading
                    </p>
                  </div>
                )}

                {item.type === "video" && (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
                      {item.content ? (
                        <video 
                          src={item.content} 
                          controls 
                          className="mx-auto max-w-full h-auto rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-500">
                          <Video className="mx-auto mb-2 h-12 w-12" />
                          <p>Video will appear here</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateContent(item.id, e.target.value)}
                      placeholder="Enter video URL"
                      className="w-full p-2 bg-background border rounded-md"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Add a direct video URL (MP4, WebM, etc.)
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project Specifications */}
          <div className="mt-12 bg-dark-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-tech-purple">Project Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-200 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-tech-blue/20 text-xs rounded-full">Testing</span>
                  <span className="px-3 py-1 bg-tech-blue/20 text-xs rounded-full">Aerodynamics</span>
                  <span className="px-3 py-1 bg-tech-blue/20 text-xs rounded-full">Prototype</span>
                </div>
              </div>
              <div className="bg-dark-200 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Project Status</h3>
                <p className="text-sm text-muted-foreground">Completed - Best Project Award Winner</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WindTunnelDetails;
