import React, { FC } from "react";
import { Wrapper as ScWrapper } from "react-aria-menubutton";
import { styled } from "@polkadot/ui/styles";

export interface WrapperProps {
  onSelection: () => void;
}

export const Wrapper = styled(ScWrapper)({
  position: "relative",
  display: "inline-block",
});