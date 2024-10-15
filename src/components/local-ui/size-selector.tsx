import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Option {
  value: string;
  label: string;
  width: number;
  height: number;
}

const options: Option[] = [
  { value: "tiktok", label: "TikTok (1080x1920)", width: 1080, height: 1920 },
  { value: "youtube", label: "YouTube (1280x720)", width: 1280, height: 720 },
  {
    value: "instagram",
    label: "Instagram (1080x1080)",
    width: 1080,
    height: 1080,
  },
  { value: "portrait", label: "Portrait (720x1280)", width: 720, height: 1280 },
  { value: "custom", label: "Custom", width: 1080, height: 720 },
];

interface Props {
  width: number;
  height: number;
  customSize: boolean;
  handleSizeChange: (value: string) => void;
}

export const SizeSelector: React.FC<Props> = ({
  width,
  height,
  customSize,
  handleSizeChange,
}) => {
  return (
    <RadioGroup defaultValue="tiktok" onValueChange={handleSizeChange}>
      {options.map(({ value, label }) => (
        <div
          key={value}
          className="flex items-center space-x-2 mb-2 text-white"
        >
          <RadioGroupItem
            value={value}
            id={value}
            checked={
              !customSize &&
              options.some(
                (option) =>
                  option.value === value &&
                  option.width === width &&
                  option.height === height
              )
            }
            className="text-white border-white"
          />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
