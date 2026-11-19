export async function clickAndAcceptAlert(page, button) {
  const [message] = await Promise.all([
    page.waitForEvent('dialog').then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    }),
    button.click(),
  ]);

  return message;
}