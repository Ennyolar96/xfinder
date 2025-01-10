export const sanitizeSensitiveFields = <T>(data: T | T[]): T | T[] => {
  const removePassword = (record: any) => {
    if (
      record &&
      typeof record === "object" &&
      !Array.isArray(record) &&
      "password" in record
    ) {
      const { password, ...rest } = record;
      return rest;
    }
    return record;
  };

  if (Array.isArray(data)) {
    return data.map((item) =>
      Array.isArray(item) ? item.map(removePassword) : removePassword(item)
    );
  }

  return removePassword(data);
};
