import { Checkbox, CloseButton, Input } from "@mantine/core";

type Filters = {
  Put: boolean;
  Call: boolean;
  Repeat: boolean;
  Heavy: boolean;
  Golden: boolean;
  hgp: boolean;
  lgp: boolean;
};

type FilterProps = {
  filters?: Filters;
  setFilter?: (key: keyof Filters, value: boolean) => void;
};

export default function FlowAiFilter(props: FilterProps) {
    
    return (
        <div className="flex flex-col w-full h-full px-2">
            <p className="text-xs text-zinc-500 my-2">Option Type</p>
            <div className="flex gap-2">
                <Checkbox
                  checked={props.filters?.Put}
                  onChange={(event) => props.setFilter?.('Put', event.currentTarget.checked)}
                  label="PUT"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.Call}
                  onChange={(event) => props.setFilter?.('Call', event.currentTarget.checked)}
                  label="CALL"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Details</p>
            <div className="flex flex-col gap-1 mb-2">
                <Checkbox
                  checked={props.filters?.Repeat}
                  onChange={(event) => props.setFilter?.('Repeat', event.currentTarget.checked)}
                  label="Repeat"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.Heavy}
                  onChange={(event) => props.setFilter?.('Heavy', event.currentTarget.checked)}
                  label="Heavy"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.Golden}
                  onChange={(event) => props.setFilter?.('Golden', event.currentTarget.checked)}
                  label="Golden"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Gain %</p>
            <div className="flex flex-col gap-1 mb-2">
                <Checkbox
                  checked={props.filters?.hgp}
                  onChange={(event) => {props.setFilter?.('hgp', event.currentTarget.checked); props.setFilter?.('lgp', !event.currentTarget.checked)}}
                  label="High Gain %"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.lgp}
                  onChange={(event) => {props.setFilter?.('lgp', event.currentTarget.checked); props.setFilter?.('hgp', !event.currentTarget.checked)}}
                  label="Live Gain %"
                  color="violet"
                  size="xs"
                />
            </div>
        </div>
    )
}