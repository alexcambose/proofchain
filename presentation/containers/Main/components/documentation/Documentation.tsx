import Button from '@components/button/Button';
import config from 'config';
import * as React from 'react';
import {
  DocumentationContainer,
  DocumentationInfo,
  DocumentationPanel,
  DocumentationPanelAction,
  DocumentationPanelsContainer,
  DocumentationPanelTitle,
  DocumentationTitle,
} from './Documentation.styled';

interface IDocumentationProps {}

const Documentation: React.FunctionComponent<IDocumentationProps> = (props) => {
  return (
    <DocumentationContainer id="documentation">
      <DocumentationTitle>Documentation</DocumentationTitle>
      <DocumentationPanelsContainer>
        <DocumentationPanel left>
          <DocumentationPanelTitle>Whitepaper</DocumentationPanelTitle>
          <DocumentationInfo>
            Informational document about the project
          </DocumentationInfo>
          <DocumentationPanelAction>
            <a href={config.whitepaperLink}>
              <Button>View</Button>
            </a>
          </DocumentationPanelAction>
        </DocumentationPanel>
        <DocumentationPanel>
          <DocumentationPanelTitle>
            Library documentation
          </DocumentationPanelTitle>
          <DocumentationInfo>
            Documentation for the proofchain JS library
          </DocumentationInfo>

          <DocumentationPanelAction>
            <a href={config.documentationLink}>
              <Button>View</Button>
            </a>
          </DocumentationPanelAction>
        </DocumentationPanel>
      </DocumentationPanelsContainer>
    </DocumentationContainer>
  );
};

export default Documentation;
