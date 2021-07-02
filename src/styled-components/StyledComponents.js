import styled from 'styled-components';

const Container = styled.View`
     flex: 1;        
     ${props => props.color ? `background-color: ${props.color}` : 'transparent'}
     ${props => props.positionC && 'justify-content: center;'}
     ${props => props.center && 'align-items: center;'}     
`;

const Content = styled.View`
     background-color: ${props => props.color};
     ${props => props.padding ? `padding: ${props.padding}px;` : 'padding: 0px;'};
     ${props => props.row ? 'flex-direction: row;' : 'flex-direction: column;'}
     ${props => props.space && 'justify-content: space-between;'}
     ${props => props.positionR && 'justify-content: flex-end;'}
     ${props => props.positionL && 'justify-content: flex-start;'}
     ${props => props.positionC && 'justify-content: center;'}
     ${props => props.center && 'align-items: center;'}  
     width: 100%;
     height: 100%
`;


const Layout = styled.View`
     background-color: ${props => props.color};
     ${props => props.padding ? `padding: ${props.padding}px` : 'padding: 0px;'}
     ${props => props.row ? 'flex-direction: row;' : 'flex-direction: column;'}
     ${props => props.space && 'justify-content: space-between;'}
     ${props => props.positionR && 'justify-content: flex-end;'}
     ${props => props.positionL && 'justify-content: flex-start;'}
     ${props => props.positionC && 'justify-content: center;'}
     ${props => props.center && 'align-items: center;'}  
     ${props => props.right && 'align-items: flex-end;'}  
     ${props => props.border && 'border-radius:' + props.border + 'px' + ';'} 
     ${props => props.wrap && 'flex-wrap: wrap;'} 
     width: 100%;
     height: auto 
`;

const LayoutChild = styled.View`  
     background-color: ${props => props.color};
     width:  ${props => `${props.width}`};
     ${props => props.padding ? `padding: ${props.padding}px` : 'padding: 0px;'}
     ${props => props.row ? 'flex-direction: row;' : 'flex-direction: column;'}
     ${props => props.top ? `margin-top: ${props.top}px` : 'margin-top: 0px;'}
     ${props => props.space && 'justify-content: space-between;'}
     ${props => props.positionR && 'justify-content: flex-end;'}
     ${props => props.positionC && 'justify-content: center;'}     
     ${props => props.left && 'margin-left:' + props.left + 'px' + ';'} 
     ${props => props.border && 'border-radius:' + props.border + 'px' + ';'} 
     ${props => props.center && 'align-items: center;'}      
     ${props => props.endR && 'align-items: flex-end;'}      
     height: auto 
`;

export {Container, Content, Layout, LayoutChild   };
