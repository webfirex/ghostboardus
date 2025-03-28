import { Checkbox, CloseButton, Input, Pagination } from "@mantine/core";
import { useState } from "react";

type Filters = {
  put: boolean;
  call: boolean;
  yellow: boolean;
  white: boolean;
  magenta: boolean;
  aboveAsk: boolean;
  belowBid: boolean;
  atAsk: boolean;
  atBid: boolean;
  stock: boolean;
  etf: boolean;
  inM: boolean;
  outM: boolean;
  sweep: boolean;
  minVal: string;
  minCVal: string;
  maxCVal: string;
  strike: string;
  page: number;
};

type FilterProps = {
  filters?: Filters;
  setFilter?: (key: keyof Filters, value: any) => void;
  pages?: number;
};

export default function FlowFilter(props: FilterProps) {

    return (
        <div className="flex flex-col w-full h-full px-2 max-w-[239px]">
            <p className="text-xs text-zinc-500 my-2">Option Type</p>
            <div className="flex gap-2">
                <Checkbox
                  checked={props.filters?.put}
                  onChange={(event) => props.setFilter?.('put', event.currentTarget.checked)}
                  label="PUT"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.call}
                  onChange={(event) => props.setFilter?.('call', event.currentTarget.checked)}
                  label="CALL"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Flow Colors</p>
            <div className="flex gap-2">
                <Checkbox
                  checked={props.filters?.yellow}
                  onChange={(event) => props.setFilter?.('yellow', event.currentTarget.checked)}
                  label="Yellow"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.white}
                  onChange={(event) => props.setFilter?.('white', event.currentTarget.checked)}
                  label="White"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.magenta}
                  onChange={(event) => props.setFilter?.('magenta' ,event.currentTarget.checked)}
                  label="Magenta"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Bid Ask</p>
            <div className="flex flex-col gap-1">
                <Checkbox
                  checked={props.filters?.aboveAsk}
                  onChange={(event) => props.setFilter?.('aboveAsk', event.currentTarget.checked)}
                  label="Above Ask"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.belowBid}
                  onChange={(event) => props.setFilter?.('belowBid', event.currentTarget.checked)}
                  label="Below Bid"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.atAsk}
                  onChange={(event) => props.setFilter?.('atAsk', event.currentTarget.checked)}
                  label="At or Above Ask"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.atBid}
                  onChange={(event) => props.setFilter?.('atBid', event.currentTarget.checked)}
                  label="At or Below Bid"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Security</p>
            <div className="flex gap-2">
                <Checkbox
                  checked={props.filters?.stock}
                  onChange={(event) => props.setFilter?.('stock', event.currentTarget.checked)}
                  label="Stock"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.etf}
                  onChange={(event) => props.setFilter?.('etf', event.currentTarget.checked)}
                  label="ETF"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Other</p>
            <div className="flex flex-col gap-1">
                <Checkbox
                  checked={props.filters?.inM}
                  onChange={(event) => props.setFilter?.('inM', event.currentTarget.checked)}
                  label="In The Money"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.outM}
                  onChange={(event) => props.setFilter?.('outM', event.currentTarget.checked)}
                  label="Out The Money"
                  color="violet"
                  size="xs"
                />
                <Checkbox
                  checked={props.filters?.sweep}
                  onChange={(event) => props.setFilter?.('sweep', event.currentTarget.checked)}
                  label="Sweep Only"
                  color="violet"
                  size="xs"
                />
            </div>
            <p className="text-xs text-zinc-500 my-2">Min Value</p>
            <Input
              placeholder="$25,000"
              value={props.filters?.minVal}
              onChange={(event) => props.setFilter?.('minVal', event.currentTarget.value)}
              rightSectionPointerEvents="all"
              className="mb-"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => props.setFilter?.('minVal', '')}
                  style={{ display: props.filters?.minVal != '' ? 'block' : 'none' }}
                />
              }
            />
            <p className="text-xs text-zinc-500 my-2">Strike Value</p>
            <Input
              placeholder="350"
              value={props.filters?.strike}
              onChange={(event) => props.setFilter?.('strike', event.currentTarget.value)}
              rightSectionPointerEvents="all"
              className="mb-"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => props.setFilter?.('strike', '')}
                  style={{ display: props.filters?.strike != '' ? 'block' : 'none' }}
                />
              }
            />
            <p className="text-xs text-zinc-500 my-2">Contract Price Value</p>
            <div className="flex mb-2 gap-2 items-center">
              <Input
                placeholder="Min"
                value={props.filters?.minCVal}
                onChange={(event) => props.setFilter?.('minCVal', event.currentTarget.value)}
                rightSectionPointerEvents="all"
                className="w-1/2"
                rightSection={
                  <CloseButton
                    aria-label="Clear input"
                    onClick={() => props.setFilter?.('minCVal', '')}
                    style={{ display: props.filters?.minCVal != '' ? 'block' : 'none' }}
                  />
                }
              />
              <Input
                placeholder="Max"
                value={props.filters?.maxCVal}
                onChange={(event) => props.setFilter?.('maxCVal', event.currentTarget.value)}
                rightSectionPointerEvents="all"
                className="w-1/2"
                rightSection={
                  <CloseButton
                    aria-label="Clear input"
                    onClick={() => props.setFilter?.('maxCVal', '')}
                    style={{ display: props.filters?.maxCVal != '' ? 'block' : 'none' }}
                  />
                }
              />
            </div>
            <Pagination className="sm:hidden" hideWithOnePage value={props.filters?.page} onChange={(e) => {props.setFilter?.('page', e)}} siblings={0} boundaries={-1} size={"sm"} total={props.pages || 10} radius={"sm"} mb={'10px'} color="#635BFF" />
        </div>
    )
}