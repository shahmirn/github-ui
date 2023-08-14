import { render, screen } from '@testing-library/react';
import { OrganizationCard, OrganizationCardProps } from './OrganizationCard';

describe('OrganizationCard', () => {
  let organization: OrganizationCardProps['organization'];

  beforeEach(() => {
    organization = {
      id: 123,
      login: 'testorg',
      avatar_url: 'https://example.com/avatar.png',
    };
  });

  it("renders the organization's name and avatar", () => {
    render(<OrganizationCard organization={organization} />);

    expect(screen.getByText(organization.login)).toBeInTheDocument();

    const avatar = screen.getByAltText(`Avatar for ${organization.login}`);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', organization.avatar_url);
  });

  it("renders the organization's description if provided", () => {
    organization.description = 'Test description';
    render(<OrganizationCard organization={organization} />);

    expect(screen.getByText(organization.description)).toBeInTheDocument();
  });
});
