export class ProgressBar {
  private valueElement: HTMLElement;
  private fillElement: HTMLElement;
  private value: number;

  constructor(
    initialValue: number = 0,
    valueElement: HTMLElement,
    fillElement: HTMLElement
  ) {
    this.valueElement = valueElement;
    this.fillElement = fillElement;
    this.value = initialValue;
    this.setValue(initialValue);
  }

  setValue(newValue: number) {
    if (isNaN(newValue)) return 0;
    if (newValue <= 0) newValue = 0;
    if (newValue > 100) newValue = 100;

    this.value = newValue;
    this.update();
  }

  update() {
    const percentage = `${this.value}%`;
    this.fillElement.style.width = percentage;
    this.valueElement.textContent = percentage;
  }
}
