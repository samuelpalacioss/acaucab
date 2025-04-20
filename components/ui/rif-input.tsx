import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RifInputProps {
  control: any;
  name: string;
}

export function RifInput({ control, name }: RifInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>RIF</FormLabel>
          <div className="flex gap-2">
            <FormField
              control={control}
              name="tipoRif"
              render={({ field: tipoRifField }) => (
                <FormItem className="w-[80px]">
                  <Select onValueChange={tipoRifField.onChange} defaultValue={tipoRifField.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="J" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="J">J</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormControl>
              <Input placeholder="12345678-9" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
