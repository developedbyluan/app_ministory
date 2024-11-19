import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { X } from "lucide-react";
import type { TrainingTimeRecord } from "@/types/types";

type TableProps = {
  isTableVisible: boolean;
  setIsTableVisible: (value: boolean) => void;
  learningSessions: TrainingTimeRecord;
};

export default function StatsTable({
  isTableVisible,
  setIsTableVisible,
  learningSessions,
}: TableProps) {
  const totalTrainingTime = Object.values(learningSessions).reduce(
    (acc, time) => acc + time,
    0
  );
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
        isTableVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Training Sessions</h4>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTableVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4 mb-2 bg-muted/50 p-3 rounded-lg">
          <p className="text-sm font-medium">
            Total Time:{" "}
            <span className="text-primary">
              {Math.floor(totalTrainingTime / 60)}m{" "}
              {Math.floor(totalTrainingTime % 60)}s
            </span>
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(learningSessions).map(([date, time], index) => (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell>
                  {Math.floor(time / 60)}m {Math.floor(time % 60)}s
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
