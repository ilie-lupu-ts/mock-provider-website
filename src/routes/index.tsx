import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
        <div className="flex">
          {/* Main content */}
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  My Resume
                </h1>
                <p className="text-gray-600 text-lg">
                  Professional Experience & Education
                </p>
              </div>

              {/* Career Summary */}
              <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">
                    Career Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <p className="text-gray-700 flex-1 leading-relaxed">
                      I am a passionate and driven professional seeking
                      opportunities that will leverage my extensive experience
                      in frontend development while providing continuous growth
                      and learning opportunities. My goal is to contribute to
                      innovative projects that challenge me to expand my skill
                      set and make meaningful impacts through technology.
                    </p>
                    <img
                      src={`${baseUrl}headshot-on-white.jpg`}
                      alt="Professional headshot"
                      className="w-44 h-52 rounded-2xl object-cover shadow-md transition-transform hover:scale-105"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
