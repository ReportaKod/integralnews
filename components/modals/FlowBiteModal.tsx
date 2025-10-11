"use client"
import { PropsWithChildren, useState } from "react"
import {Modal } from "flowbite-react"
import { SimpleLink, MyButton } from "../buttons/Button"

type Size = "sm" | "md" | "lg" | "xl" | "1xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"

interface Props extends PropsWithChildren {
    openModal: boolean,
    setOpenModal: (isOpen: boolean) => void
    position: "center" | "top" | "bottom" | "right" | "left"
    size?: Size;
    colorBtn?: string
    textBtnClose?: string
    textBtnGo?: string
    modalTitle?: string
    url?: string
    isFooter?: boolean
} 

export const FlowBiteModal =({setOpenModal, isFooter, url, openModal, position, size, children, colorBtn, textBtnClose, textBtnGo, modalTitle}:Props) => {

  

    return (<Modal dismissible position={position ? position : "center"} show={openModal} size={size} onClose={() => setOpenModal(false)}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        {isFooter ?
        (<Modal.Footer>
            {url && url !== "#" ? 
            (
                <SimpleLink target="" className={"mx-auto"} url={url} variant="primary" size="small">
              {textBtnGo ? textBtnGo : "Voir plus"}
            </SimpleLink>
                ) :  <MyButton variant={"primary"} size="small">{textBtnGo ? textBtnGo : "Voir plus"}</MyButton>} 
        </Modal.Footer>)
        :null}
      </Modal>)

}