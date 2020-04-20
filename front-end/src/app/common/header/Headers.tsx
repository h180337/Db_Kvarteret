import React from 'react';
import {Header, Icon} from 'semantic-ui-react';

interface IProp {
    iconName: any
    header: string
    subHeader: string
    headerSize: any
}

const Headers: React.FC<IProp> = ({iconName, header, subHeader, headerSize}) => {
    return (
            <Header as='h2' icon size={headerSize} textAlign="center">
                <Icon name={iconName}/>
                {header}
                <Header.Subheader>
                    {subHeader}
                </Header.Subheader>
            </Header>
    );
}

export default Headers;