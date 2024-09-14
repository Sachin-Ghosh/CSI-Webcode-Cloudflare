import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";

export default function UserProfilePage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: "", // Make sure to set the userId dynamically if needed
    education: {
      degree: "",
      institution: "",
      yearOfCompletion: new Date().getFullYear(),
    },
    experience: [],
    skills: []
  });
  const [experienceData, setExperienceData] = useState({
    companyName: "",
    role: "",
    yearsWorked: 0,
  });

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.API_URL}api/candidates/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const addExperience = (data) => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, data],
    }));
    setIsDialogOpen(false);
    setExperienceData({
      companyName: "",
      role: "",
      yearsWorked: 0,
    });
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setFormData((prev) => ({
        ...prev,
        skills: newSkills,
      }));
    }
  };

  const handleSaveProfile = () => {
    if (!formData.education.degree || !formData.education.institution || !formData.userId) {
      toast("Please fill in all required fields: Degree, Institution, and User ID.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="p-4 w-full container mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Enter your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label>Degree</label>
              <Input
                placeholder="Bachelor of Science"
                value={formData.education.degree}
                onChange={(e) => setFormData({ ...formData, education: { ...formData.education, degree: e.target.value } })}
              />
            </div>
            <div>
              <label>Institution</label>
              <Input
                placeholder="University of Example"
                value={formData.education.institution}
                onChange={(e) => setFormData({ ...formData, education: { ...formData.education, institution: e.target.value } })}
              />
            </div>
            <div>
              <label>Year of Completion</label>
              <Input
                type="number"
                placeholder="2022"
                value={formData.education.yearOfCompletion}
                onChange={(e) => setFormData({ ...formData, education: { ...formData.education, yearOfCompletion: e.target.value } })}
              />
            </div>

            {/* Experience Section */}
            <div className="flex flex-col gap-2">
              <label>Experience</label>
              {formData.experience.map((exp, index) => (
                <div key={index} className="flex justify-between items-center bg-secondary p-4 rounded-md mt-2">
                  <div>
                    <p><strong>Company Name:</strong> {exp.companyName}</p>
                    <p><strong>Role:</strong> {exp.role}</p>
                    <p><strong>Years Worked:</strong> {exp.yearsWorked}</p>
                  </div>
                  <Button
                    className="bg-transparent hover:bg-transparent shadow-none"
                    onClick={() => {
                      const updatedExperience = formData.experience.filter((_, i) => i !== index);
                      setFormData((prev) => ({ ...prev, experience: updatedExperience }));
                    }}
                  >
                    <MdDelete color="red" size={30} />
                  </Button>
                </div>
              ))}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="mt-2">
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Experience</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); addExperience(experienceData); }} className="space-y-4">
                    <div>
                      <label>Company Name</label>
                      <Input
                        placeholder="Company name"
                        value={experienceData.companyName}
                        onChange={(e) => setExperienceData({ ...experienceData, companyName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Role</label>
                      <Input
                        placeholder="Role details"
                        value={experienceData.role}
                        onChange={(e) => setExperienceData({ ...experienceData, role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Years Worked</label>
                      <Input
                        type="number"
                        placeholder="Years"
                        value={experienceData.yearsWorked}
                        onChange={(e) => setExperienceData({ ...experienceData, yearsWorked: e.target.value })}
                      />
                    </div>
                    <Button type="submit">Add Experience</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Skills Section */}
            <div>
              <label>Skills</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a skill"]');
                    if (input) {
                      addSkill(input.value);
                      input.value = "";
                    }
                  }}
                >
                  Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-200 text-black px-2 py-1 rounded-full">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <Button type="button" onClick={handleSaveProfile}>Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
