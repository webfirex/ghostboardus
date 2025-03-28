'use client'
import { useUser } from "@/context/UserContext";
import { Combobox, Input, InputBase, Menu, Pagination, useCombobox } from "@mantine/core";
import { IconCalendar, IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { DatePicker } from '@mantine/dates';
// import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

type FlowFilters = {
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
  page: number;
};

export interface StockSearchState {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    page?: number;
    pages?: number;
    setPage?: (key: keyof FlowFilters, value: any) => void;
    flowDate?: [Date | null, Date | null]
    setFlowDate?: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>  
}

export interface StockFilterState {
    value: string | null;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

type ScannerProps = {
  filters?: {type: string; interval: string};
  setFilter?: (key: keyof {type: string; interval: string}, value: string) => void;
}

type DarkLvlProps = {
  filters?: {symbol: string; interval: string};
  setFilter?: (key: keyof {symbol: string; interval: string}, value: string) => void;
}

export function SearchFilter() {
    const [value, setValue] = useState('');
    
    return (
        <div className="">
            <Input
              placeholder="AAPL"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              leftSection={<IconSearch stroke={'1.5'} size={'12'} />}
              rightSection={value !== '' ? <IconX onClick={() => setValue('')} /> : undefined}
              maw={'100px'}
              rightSectionPointerEvents="auto"
              size="xs"
            />
        </div>
    )
}

export function FlowSearchFilter(props: StockSearchState) {
    const user = useUser()

    return (
        <div className="sm:flex sm:gap-2 sm:items-center">
            <Pagination hideWithOnePage className=" maxTab:hidden" value={props.page} onChange={(e) => {props.setPage?.('page', e)}} siblings={0} boundaries={-1} size={"sm"} total={props.pages || 10} radius={"sm"} mb={'10px'} color="#635BFF" />
            <Input
              placeholder="AAPL"
              value={props.search}
              onChange={(event) => props.setSearch(event.currentTarget.value.toUpperCase())}
              leftSection={<IconSearch stroke={'1.5'} size={'12'} />}
              rightSection={props.search !== '' ? <IconX size={'12'} onClick={() => props.setSearch('')} /> : undefined}
              maw={'100px'}
              rightSectionPointerEvents="auto"
              size="xs"
              className="sm:mb-2"
            />
            <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                <Menu.Target>
                    <div className="flex w-fit h-full gap-2">
                        <button type="button" className=" size-[30px] flex justify-center items-center bg-primary/50 rounded-sm">
                            <IconCalendar size={12} className=" text-white" />
                        </button>
                    </div>
                </Menu.Target>
                <Menu.Dropdown miw={'200'}>
                  <DatePicker type="range" allowSingleDateInRange value={props.flowDate} onChange={props.setFlowDate} color="#635BFF" />
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export function FlowAiSearchFilter(props: StockSearchState) {
    const user = useUser()
    return (
        <div className="sm:flex sm:gap-2 sm:items-center">
            <Input
              placeholder="AAPL"
              value={props.search}
              onChange={(event) => props.setSearch(event.currentTarget.value.toUpperCase())}
              leftSection={<IconSearch stroke={'1.5'} size={'12'} />}
              rightSection={props.search !== '' ? <IconX size={'12'} onClick={() => props.setSearch('')} /> : undefined}
              maw={'100px'}
              rightSectionPointerEvents="auto"
              size="xs"
            />
            <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                <Menu.Target>
                    <div className="flex w-fit h-full gap-2">
                        <button type="button" className=" size-[30px] flex justify-center items-center bg-primary/50 rounded-sm">
                            <IconCalendar size={12} className=" text-white" />
                        </button>
                    </div>
                </Menu.Target>
                <Menu.Dropdown miw={'200'}>
                  <DatePicker type="range" allowSingleDateInRange value={props.flowDate} onChange={props.setFlowDate} color="#635BFF" />
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export function GammaStocksFilter(props: StockFilterState) {
    const stocks = ['SPX', 'SPY'];
    const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption(),
    });
  
    const options = stocks.map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));
  
    return (
      <Combobox
        store={combobox}
        size="xs"
        onOptionSubmit={(val) => {
          props.setValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {props.value || <Input.Placeholder>Select Stock</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>
  
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
}

export function NetFlowFilter(props: StockFilterState) {
  const stocks = ['SPX', 'SPY', 'QQQ', 'NDX', 'SQQQ', 'TSLA', 'META', 'AAPL', 'BABA', 'NVDA', 'AMD', 'NFLX', 'COIN', 'MSTR', 'AMZN', 'COST'];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = stocks.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      size="xs"
      onOptionSubmit={(val) => {
        props.setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          size="xs"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {props.value || <Input.Placeholder>Select Stock</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export function ScannerFilter(props: ScannerProps) {
  const type = ['Inside', 'Hammer'];
  const intervals = ['Daily', 'Weekly', 'Monthly'];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const combobox2 = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options1 = type.map((item) => (
    <Combobox.Option value={item} key={item} className="">
      {item}
    </Combobox.Option>
  ));

  const options2 = intervals.map((item) => (
    <Combobox.Option value={item} key={item} className="text-nowrap">
      {item}
    </Combobox.Option>
  ));

  return (
    <div className="flex gap-1 items-center">
      <Combobox
        store={combobox}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('type', val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {props.filters?.type || <Input.Placeholder>Select Type</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options1}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Combobox
        store={combobox2}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('interval', val);
          combobox2.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox2.toggleDropdown()}
          >
            {props.filters?.interval || <Input.Placeholder>Select Interval</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options2}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function DarkLevelsFilter(props: DarkLvlProps) {
  const symbol = ['SPY', 'QQQ'];
  const intervals = ['Daily', 'Monthly'];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const combobox2 = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options1 = symbol.map((item) => (
    <Combobox.Option value={item} key={item} className="">
      {item}
    </Combobox.Option>
  ));

  const options2 = intervals.map((item) => (
    <Combobox.Option value={item} key={item} className="text-nowrap">
      {item}
    </Combobox.Option>
  ));

  return (
    <div className="flex gap-1 items-center">
      <Combobox
        store={combobox}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('symbol', val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {props.filters?.symbol || <Input.Placeholder>Select Type</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options1}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Combobox
        store={combobox2}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('interval', val);
          combobox2.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox2.toggleDropdown()}
          >
            {props.filters?.interval || <Input.Placeholder>Select Interval</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options2}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function DarkPrintsFilter(props: StockFilterState) {
  const stocks = ['SPY', 'QQQ'];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = stocks.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      size="xs"
      onOptionSubmit={(val) => {
        props.setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          size="xs"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {props.value || <Input.Placeholder>Select Stock</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export function DarkAiFilter(props: DarkLvlProps) {
  const symbol = ['SPY', 'QQQ'];
  const intervals = ['Daily', 'Monthly'];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const combobox2 = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options1 = symbol.map((item) => (
    <Combobox.Option value={item} key={item} className="">
      {item}
    </Combobox.Option>
  ));

  const options2 = intervals.map((item) => (
    <Combobox.Option value={item} key={item} className="text-nowrap">
      {item}
    </Combobox.Option>
  ));

  return (
    <div className="flex gap-1 items-center">
      <Combobox
        store={combobox}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('symbol', val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {props.filters?.symbol || <Input.Placeholder>Select Type</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options1}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Combobox
        store={combobox2}
        size="xs"
        onOptionSubmit={(val) => {
          props.setFilter?.('interval', val);
          combobox2.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            size="xs"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox2.toggleDropdown()}
          >
            {props.filters?.interval || <Input.Placeholder>Select Interval</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options2}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}