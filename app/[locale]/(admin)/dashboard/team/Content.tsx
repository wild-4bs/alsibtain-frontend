"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AddButton } from "./AddButton";
import { Input } from "@/components/ui/input";
import { Employee } from "./Employee";
import { useGetEmployees } from "@/services/employees";
import { Employee as EmployeeType } from "@/types/employees";

export const Content = () => {
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const { data, isPending } = useGetEmployees({ keywords: name });

  useEffect(() => {
    const timeout = setTimeout(() => setName(nameInput), 400);
    return () => clearTimeout(timeout);
  }, [nameInput]);

  const sortedEmployees = useMemo(() => {
    if (!data?.payload) return [];
    return [...data.payload].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [data]);

  useEffect(() => {
    setEmployees(sortedEmployees);
  }, [sortedEmployees]);

  return (
    <div className="p-4 m-2 rounded-2xl">
      <div className="header flex gap-2 justify-between">
        <Input
          placeholder="Search by name.."
          type="text"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <AddButton />
      </div>

      {employees.length === 0 && (
        <h1 className="text-xl font-medium text-center mt-4 text-subtitle-color">
          No Team Members
        </h1>
      )}

      {employees.length > 0 && (
        <div
          className="employees flex flex-wrap gap-4 mt-8"
          style={{ rowGap: 8 }}
        >
          {employees.map((employee) => (
            <Employee key={employee._id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};
