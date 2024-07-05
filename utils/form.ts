export const inputFormAdapter = (form: any, name: string, value?: any) => {
  const inputProps = form.register(name);

  if (value) {
    inputProps.value = value;
  }
  return {
    onChange: (text: string | boolean) => form.setValue(name, text),
    inputProps,
    error: Boolean(form.formState.errors?.[name]),
  };
};

export const dateInputParser = (value: Date | undefined) => {
  if (value) {
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    return {
      day,
      month,
      year,
    };
  }
};

export const dateOutputParser = (year: number, month: number, day: number) => {
  return new Date(year, month, day);
};
