import { COLORS } from "../../../../config/colors";
import { BaseComponent } from "../../../../core/components/base.component";
import htmlContent from "./card-label.component.html";

export class CardLabelComponent extends BaseComponent {
  constructor({ container, props, }) {
    super({ container, htmlContent, });
    this.text = props.text;
    this.color = props.color || COLORS.PRIMARY;
    this.onClicked = props.onClicked || (() => {});
    this.init();
    console.log(this.color)
  }

  init() {
    this.cardLabelElement = this.container;
    this.cardLabelTextElement = this.container.querySelector(
      ".card-label-text"
    );
    this.setColor();
    this.setText();
  }

  setColor(color = this.color) {
    // let appColor;
    // switch (color) {
    //   case "blue":
    //     appColor = COLORS.PRIMARY;
    //     break;
    //   case "purple":
    //     appColor = COLORS.PURPLE;
    //     break;
    //   case "pink":
    //     appColor = COLORS.PINK;
    //     break;
    //   default:
    //     appColor = COLORS.PRIMARY;
    //     break;
    // }

    this.cardLabelElement.style.backgroundColor = COLORS[this.color.toUpperCase()] || COLORS.GRAY ;
  }

  setText(text = this.text) {
    this.cardLabelTextElement.innerHTML = text;
  }
}
