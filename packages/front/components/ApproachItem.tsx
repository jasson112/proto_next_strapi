import Image from "next/image";
import "@splidejs/react-splide/css/core";
import plus from "../public/plus.svg";
import minus from "../public/minus.svg";
import React, { Component } from "react";

type ApproachItemState = {
  activeAccordeon: boolean;
};

type ApproachProps = {
    icon?: string,
    title?: string,
    children?: React.ReactNode
}

class ApproachItem extends Component<ApproachProps, ApproachItemState> {
  constructor(props: ApproachProps) {
    super(props);
  }
  state: ApproachItemState = {
    activeAccordeon: false,
  };
  approachClick = () => {
    this.setState({activeAccordeon: !this.state.activeAccordeon})
  };
  render = () => {
    return (
      <>
        <div className={ this.state.activeAccordeon ? "approach_list_item selected" : "approach_list_item" } onClick={this.approachClick} >
          <div className="item_title_wrapper">
            <div className="item_icon_wrapper">
              <div className="item_icon">
                <Image
                  alt="Mountains"
                  src={this.props.icon}
                  width={40}
                  height={40}
                  quality={100}
                />
              </div>
              <div className="item_title">{this.props.title}</div>
            </div>
            <div className={ this.state.activeAccordeon ? "item_plus disabled" : "item_plus" } >
              <Image
                alt="Mountains"
                src={plus}
                width={40}
                height={40}
                quality={100}
              />
            </div>
            <div className={ this.state.activeAccordeon ? "item_minus enabled" : "item_minus" }>
              <Image
                alt="Mountains"
                src={minus}
                width={40}
                height={40}
                quality={100}
              />
            </div>
          </div>
          <div className="item_desc">
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default ApproachItem;
