import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing:border-box;
    }
    body,html {
        color:${(props : any) => props.theme.colors.fontColor};
        background-color: ${(props : any) => props.theme.colors.backgroundColor};
        font-family:sans-serif;
        margin:0;
        padding:0;
        height: 100%;
        width: 100%;

    }
`;
