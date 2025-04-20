import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CedulaInputProps {
  control: any;
  name: string;
}

export function CedulaInput({ control, name }: Omit<CedulaInputProps, "label">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cédula de Identidad</FormLabel>
          <div className="flex gap-2">
            <FormField
              control={control}
              name="nacionalidad"
              render={({ field: nacionalidadField }) => (
                <FormItem className="w-[80px]">
                  <Select
                    onValueChange={nacionalidadField.onChange}
                    defaultValue={nacionalidadField.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="V" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="V">V</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormControl>
              <Input placeholder="12345678" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
