import { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import type { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import cx from "classnames";

import styles from "./ListSelect.module.scss";

import { FaChevronDown } from "react-icons/fa";

export interface ListSelectItemData {
  value: string;
  prefix: string;
  label: string;
}

interface ListSelectProps extends SelectProps {
  id?: string;
  items: ListSelectItemData[];
  placeholder?: string;
}

export const ListSelect = ({
  id,
  items,
  placeholder,
  ...props
}: ListSelectProps) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        id={id}
        className={styles.trigger}
        aria-label={placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.selectIcon}>
          <FaChevronDown size="12" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content}>
          <Select.Viewport className={styles.viewport}>
            <Select.Group>
              {items.map((item) => (
                <ListSelectItem value={item.value} key={item.value}>
                  {item.prefix} {item.label}
                </ListSelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

ListSelect.displayName = "Select";

export const ListSelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.Item
        className={cx(styles.item, className)}
        textValue={props.value}
        ref={ref}
        {...props}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

ListSelectItem.displayName = "SelectItem";
