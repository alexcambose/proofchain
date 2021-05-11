import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'baseui';
import { Card, StyledAction } from 'baseui/card';
import { StyledSpinnerNext as Spinner } from 'baseui/spinner';
import React from 'react';

interface IGridBaseProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
}
const Header = styled('div', ({ $theme }) => ({
  marginLeft: `-1px`,
  marginRight: `-1px`,
  marginTop: `-1px`,
  paddingLeft: $theme.sizing.scale600,
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  background: $theme.colors.accent,
  display: 'flex',
  justifyContent: 'space-between',
  color: $theme.colors.primaryB,
  ...$theme.typography.LabelMedium,
}));

const Title = styled('div', ({ $theme }) => ({
  cursor: 'default',
}));

const TitleIcon = styled('span', ({ $theme }) => ({
  color: $theme.colors.primaryB,
  cursor: 'move',
  opacity: 0.5,
  marginRight: $theme.sizing.scale300,
}));

const IconContainer = styled('div', ({ $theme }) => ({
  // background: $theme.colors.backgroundTertiary,
  height: '100%',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...$theme.typography.DisplaySmall,
}));

const HeaderActions = styled('div', ({ $theme }) => ({}));
const BodyContents = styled('div', ({ $theme }) => ({
  flex: 2,
  padding: '2%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const StyledBody = styled('div', ({ $theme, isDisabled }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  background: isDisabled && $theme.colors.backgroundTertiary,
}));

export const shouldBeDisabled = (
  cardType,
  companyType: CompanyEntityTypeEnum,
  entityType: EntityTypeEnum
) => {
  if (
    ['material', 'raw material', 'batch', 'transport'].indexOf(cardType) !==
      -1 &&
    entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY
  )
    return true;
  if (
    ['material', 'raw material', 'batch'].indexOf(cardType) !== -1 &&
    companyType === CompanyEntityTypeEnum.LOGISTIC
  )
    return true;
  return false;
};

const GridBase: React.FC<IGridBaseProps> = ({
  title,
  children,
  icon,
  isLoading,
  isDisabled,
}) => {
  return (
    <Card
      overrides={{
        Title: {
          component: ({ children }) => (
            <Header>
              <Title>
                <TitleIcon>
                  <FontAwesomeIcon icon="th" />
                </TitleIcon>
                {children}
              </Title>
              <HeaderActions></HeaderActions>
            </Header>
          ),
        },

        Root: {
          style: ({ $theme }) => ({
            height: '100%',
            transition: $theme.animation.timing200,
            filter: isDisabled ? `brightness(40%)` : `brightness(100%)`,
            opacity: isDisabled ? 0.5 : 1,
            [':active']: {
              boxShadow: $theme.lighting.shadow700,
              opacity: '0.95',
              // transform: 'scale(1.01)',
            },
          }),
        },
        Contents: {
          style: ({ $theme }) => ({
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }),
        },
        Body: {
          style: ({ $theme }) => ({
            height: '100%',
            margin: 0,
          }),
        },
      }}
      title={title}
    >
      <StyledBody $isDisabled={isDisabled}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {icon && <IconContainer>{icon}</IconContainer>}
            <BodyContents>{children}</BodyContents>
          </>
        )}
      </StyledBody>
    </Card>
  );
};

export default GridBase;
