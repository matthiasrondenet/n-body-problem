import React, { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ObjectType = { [key: string]: unknown };
interface JsonEditorProps {
  title?: string;
  value?: ObjectType;
  validate?: (json: string) => string | undefined;
  onValueChange?: (value: ObjectType) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  title,
  value = {},
  validate,
  onValueChange,
}) => {
  const formatJson = useCallback(
    (json: ObjectType) => JSON.stringify(json, null, 2),
    []
  );

  const [jsonInput, setJsonInput] = useState<string>(formatJson(value));
  const [error, setError] = useState<string | undefined>();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setJsonInput(newValue);

      try {
        const parsed = JSON.parse(newValue);
        const formatted = formatJson(parsed);
        const validationError = validate?.(formatted);
        setError(validationError);
        onValueChange?.(JSON.parse(formatted));
      } catch (e) {
        setError(`Invalid JSON: ${e}`);
      }
    },
    [onValueChange, formatJson, validate]
  );

  return (
    <Card className="size-full">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Textarea
          className="font-mono text-sm"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Edit JSON here..."
          rows={10}
        />
      </CardContent>
      <CardFooter>
        {error && <p className="text-red-500">{error}</p>}
      </CardFooter>
    </Card>
  );
};
