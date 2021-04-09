import Button from '@components/button/Button';
import * as React from 'react';
import {
  DocumentationContainer,
  DocumentationPanel,
  DocumentationPanelAction,
  DocumentationPanelsContainer,
  DocumentationPanelTitle,
  DocumentationTitle,
} from './Documentation.styled';

interface IDocumentationProps {}

const Documentation: React.FunctionComponent<IDocumentationProps> = (props) => {
  return (
    <DocumentationContainer>
      <DocumentationTitle>Documentation</DocumentationTitle>
      <DocumentationPanelsContainer>
        <DocumentationPanel left>
          <DocumentationPanelTitle>Whitepaper</DocumentationPanelTitle>
          <DocumentationPanelAction>
            <Button>View</Button>
          </DocumentationPanelAction>
        </DocumentationPanel>
        <DocumentationPanel>
          <DocumentationPanelTitle>Whitepaper</DocumentationPanelTitle>
          <DocumentationPanelAction>
            <Button>View</Button>
          </DocumentationPanelAction>
        </DocumentationPanel>
      </DocumentationPanelsContainer>
    </DocumentationContainer>
  );
};

export default Documentation;
