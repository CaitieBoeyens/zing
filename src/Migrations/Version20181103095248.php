<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181103095248 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE response DROP CONSTRAINT fk_3e7b0bfb291a82dc');
        $this->addSql('DROP INDEX idx_3e7b0bfb291a82dc');
        $this->addSql('ALTER TABLE response ADD upvotes INT NOT NULL');
        $this->addSql('ALTER TABLE response ADD downvotes INT NOT NULL');
        $this->addSql('ALTER TABLE response RENAME COLUMN user_name_id TO user_id');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFBA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3E7B0BFBA76ED395 ON response (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFBA76ED395');
        $this->addSql('DROP INDEX IDX_3E7B0BFBA76ED395');
        $this->addSql('ALTER TABLE response ADD user_name_id INT NOT NULL');
        $this->addSql('ALTER TABLE response DROP user_id');
        $this->addSql('ALTER TABLE response DROP upvotes');
        $this->addSql('ALTER TABLE response DROP downvotes');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT fk_3e7b0bfb291a82dc FOREIGN KEY (user_name_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_3e7b0bfb291a82dc ON response (user_name_id)');
    }
}
