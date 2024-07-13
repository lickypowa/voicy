export const fromDateToStringTimestamp = (
  value: number | undefined,
): string | undefined => {
  return value?.toString();
};

export const fromTimestampToDate = (
  value: number | undefined,
): Date | undefined => {
  return value ? new Date(value) : undefined;
};

export const fromDateToTimestamp = (
  value: Date | undefined,
): number | undefined => {
  return value?.getTime();
};
