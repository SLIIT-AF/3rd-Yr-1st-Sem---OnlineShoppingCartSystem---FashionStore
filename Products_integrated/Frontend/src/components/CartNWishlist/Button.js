import styled from "styled-components"

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--lightBlue);
    border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    border-radius: 05rem;
    padding: 0.2rem 0.5rem;
    cursor:  pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover {
    background: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: var(--mainBlue)
    }
    &:focus {
    outline: none;
    }
`

export const ButtonWishlist = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid #d61c76;
    border-color: ${props => props.cart ? "var(--mainYellow)" : "#d61c76"};
    color: ${props => props.cart ? "var(--mainYellow)" : "#d61c76"};
    border-radius: 05rem;
    padding: 0.2rem 0.5rem;
    cursor:  pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover {
    background: ${props => props.cart ? "var(--mainYellow)" : "#d61c76"};
    color: #d61c76
    }
    &:focus {
    outline: none;
    }
`