export class SiteNavigation {
  constructor(page) {
    this.page = page
    this.englishText = page.getByText('Used cars for sale')
  }
  async acceptCookies() {
    await this.page
      .getByRole('button', { name: /Atļaut visu|Accept all/ })
      .click()
  }
  async switchLanguage(locale) { await this.page.getByText(locale, { exact: true }).click() }
  async openLatvianCatalog() {
    await this.page.getByRole('banner').getByRole('link', { name: 'Lietoti auto' }).click()
  }
  async openEnglishCatalog() {
    await this.page.getByRole('link', { name: 'Buy', exact: true }).click()
  }
}
