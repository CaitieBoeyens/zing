<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181031165546 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE userFollows (follower_id INT NOT NULL, following_id INT NOT NULL, PRIMARY KEY(follower_id, following_id))');
        $this->addSql('CREATE INDEX IDX_18BF4F51AC24F853 ON userFollows (follower_id)');
        $this->addSql('CREATE INDEX IDX_18BF4F511816E3A3 ON userFollows (following_id)');
        $this->addSql('ALTER TABLE userFollows ADD CONSTRAINT FK_18BF4F51AC24F853 FOREIGN KEY (follower_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE userFollows ADD CONSTRAINT FK_18BF4F511816E3A3 FOREIGN KEY (following_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE userFollows');
    }
}
