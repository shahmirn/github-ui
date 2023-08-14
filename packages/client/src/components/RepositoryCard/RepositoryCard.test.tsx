import { render, screen } from '@testing-library/react';
import { RepositoryCard, RepositoryCardProps } from './RepositoryCard';

describe('RepositoryCard', () => {
  let repository: RepositoryCardProps['repository'];
  beforeEach(() => {
    repository = {
      name: 'testrepo',
    };
  });

  it("renders the repository's name", () => {
    render(<RepositoryCard repository={repository} />);
    expect(screen.getByText(repository.name)).toBeInTheDocument();
  });

  it("renders the repository's description if provided", () => {
    repository.description = 'Test description';
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(repository.description)).toBeInTheDocument();
  });
});
