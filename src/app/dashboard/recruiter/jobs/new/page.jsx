"use client";

import React, { useState } from "react";
import { 
  Form, 
  TextField,
  Input, 
  TextArea, 
  Select, 
  ListBox,
  Label,
  Button, 
  Switch 
} from "@heroui/react";

// Gravity UI Icons
import { 
  Briefcase, 
  MapPin 
} from "@gravity-ui/icons";

export default function PostJobPage() {
  // Mock auto-filled company data
  const currentCompany = {
    id: "comp_12345",
    name: "Acme Corp",
    isApproved: true, 
  };

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemote: false, // false = On-site layout, true = Remote layout
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Dropdown Configurations
  const categories = [
    { id: "technology", label: "Technology" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "finance", label: "Finance" },
  ];

  const jobTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" },
  ];

  const currencies = [
    { id: "USD", label: "USD ($)" },
    { id: "EUR", label: "EUR (€)" },
    { id: "GBP", label: "GBP (£)" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoteChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isRemote: checked,
      location: checked ? "" : prev.location,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentCompany.isApproved) {
      alert("Your company profile must be approved before you can post a job.");
      return;
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      companyId: currentCompany.id,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      console.log("Submitting payload to API:", payload);
      alert("Job posted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#ededed] flex items-center justify-center p-6 selection:bg-neutral-700">
      <div className="w-full max-w-3xl bg-[#18181b] border border-neutral-800 rounded-xl shadow-2xl p-8">
        
        {/* Header Banner */}
        <div className="mb-8 border-b border-neutral-800 pb-5">
          <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-neutral-400" /> Post a New Job
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Fill out the details below to publish your opening at{" "}
            <span className="text-white font-medium underline underline-offset-4">
              {currentCompany.name}
            </span>.
          </p>
        </div>

        {/* Hero UI Wrapper Form */}
        <Form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: JOB INFO */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-l-2 border-neutral-500 pl-3">
              <h2 className="text-md font-medium text-neutral-200 tracking-wide uppercase text-xs">
                Job Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Job Title */}
              <TextField isRequired className="w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1 block">Job Title</Label>
                <Input 
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="dark"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </TextField>

              {/* Job Category Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1">Job Category</Label>
                <Select 
                  className="dark" 
                  placeholder="Select category"
                  selectedKeys={formData.category ? [formData.category] : []}
                  onSelectionChange={(keys) => handleInputChange("category", Array.from(keys)[0])}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {categories.map((cat) => (
                        <ListBox.Item key={cat.id} id={cat.id} textValue={cat.label}>
                          {cat.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Job Type Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1">Job Type</Label>
                <Select 
                  className="dark" 
                  placeholder="Select job type"
                  selectedKeys={formData.type ? [formData.type] : []}
                  onSelectionChange={(keys) => handleInputChange("type", Array.from(keys)[0])}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {jobTypes.map((type) => (
                        <ListBox.Item key={type.id} id={type.id} textValue={type.label}>
                          {type.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Deadline Input Picker */}
              <TextField isRequired className="w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1 block">Application Deadline</Label>
                <Input 
                  type="date"
                  className="dark"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                />
              </TextField>
            </div>

            {/* Compensation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
              <TextField isRequired className="w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1 block">Minimum Salary</Label>
                <Input 
                  type="number"
                  placeholder="0" 
                  className="dark"
                  value={formData.minSalary}
                  onChange={(e) => handleInputChange("minSalary", e.target.value)}
                />
              </TextField>

              <TextField isRequired className="w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1 block">Maximum Salary</Label>
                <Input 
                  type="number"
                  placeholder="0" 
                  className="dark"
                  value={formData.maxSalary}
                  onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                />
              </TextField>

              {/* Currency Dropdown */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-neutral-200 mb-1">Currency</Label>
                <Select 
                  className="dark" 
                  placeholder="Select currency"
                  selectedKeys={[formData.currency]}
                  onSelectionChange={(keys) => handleInputChange("currency", Array.from(keys)[0])}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {currencies.map((curr) => (
                        <ListBox.Item key={curr.id} id={curr.id} textValue={curr.label}>
                          {curr.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* *************************************************************** */}
            {/* MATCHING EXACT LOCATION LAYOUT TO SCREENSHOT 2                  */}
            {/* *************************************************************** */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="text-sm font-medium text-neutral-200">Location</Label>
              
              <div className="flex items-center gap-4 w-full">
                {/* Location Container Area */}
                <div className="relative flex items-center flex-1 bg-[#1c1c1f] border border-neutral-800 rounded-lg p-2.5 min-h-[46px]">
                  
                  {formData.isRemote ? (
                    /* REMOTE UI STATE: Changes text and drops input field completely when toggled */
                    <div className="flex items-center gap-2 text-neutral-400 pl-2 animate-fadeIn">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span>Position is configured as <strong className="text-white">Fully Remote</strong></span>
                    </div>
                  ) : (
                    /* ONSITE UI STATE: Renders exact replica input layout from your image */
                    <div className="flex items-center w-full gap-2 pl-1 animate-fadeIn">
                      <MapPin className="text-neutral-500 w-4 h-4 shrink-0" />
                      <input 
                        type="text"
                        placeholder="City, Country" 
                        className="bg-transparent text-white placeholder-neutral-600 focus:outline-none w-full text-sm"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* THE SWITCH: Fully reactive toggle layout using Hero UI v3 structure */}
                <Switch 
                  isSelected={formData.isRemote}
                  onChange={handleRemoteChange}
                  className="shrink-0"
                >
                  <Switch.Control className="border border-neutral-700 bg-neutral-900 data-[selected=true]:bg-white">
                    <Switch.Thumb className="bg-neutral-500 data-[selected=true]:bg-black" />
                  </Switch.Control>
                  <Switch.Content>
                    <Label className="text-sm text-neutral-300 font-medium whitespace-nowrap pl-1 select-none cursor-pointer">
                      {formData.isRemote ? "Remote Position" : "On-site Position"}
                    </Label>
                  </Switch.Content>
                </Switch>
              </div>
            </div>
            {/* *************************************************************** */}

          </section>

          <hr className="border-neutral-800" />

          {/* SECTION 2: JOB DESCRIPTION */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-l-2 border-neutral-500 pl-3">
              <h2 className="text-md font-medium text-neutral-200 tracking-wide uppercase text-xs">
                Job Details & Description
              </h2>
            </div>

            {/* Responsibilities Field */}
            <TextField isRequired className="w-full">
              <Label className="text-sm font-medium text-neutral-200 mb-1 block">Responsibilities</Label>
              <TextArea 
                placeholder="Detail the daily responsibilities and goals for this position..."
                className="dark w-full"
                rows={4}
                value={formData.responsibilities}
                onChange={(e) => handleInputChange("responsibilities", e.target.value)}
              />
            </TextField>

            {/* Requirements Field */}
            <TextField isRequired className="w-full">
              <Label className="text-sm font-medium text-neutral-200 mb-1 block">Requirements</Label>
              <TextArea 
                placeholder="List required skills, experience milestones, or educational background..."
                className="dark w-full"
                rows={4}
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
              />
            </TextField>

            {/* Benefits Field */}
            <TextField className="w-full">
              <Label className="text-sm font-medium text-neutral-200 mb-1 block">Benefits (Optional)</Label>
              <TextArea 
                placeholder="Health insurance, equity, remote stipends, unlimited PTO..."
                className="dark w-full"
                rows={3}
                value={formData.benefits}
                onChange={(e) => handleInputChange("benefits", e.target.value)}
              />
            </TextField>
          </section>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <Button
              type="button"
              variant="light"
              className="text-neutral-400 hover:text-white font-medium"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white text-black font-semibold px-6 hover:bg-neutral-200 transition-colors"
            >
              Publish Job Listing
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}
