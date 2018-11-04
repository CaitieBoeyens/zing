<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181104111430 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE response_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE reply_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE reply (id INT NOT NULL, question_id INT NOT NULL, user_id INT NOT NULL, body VARCHAR(255) NOT NULL, upvotes INT NOT NULL, downvotes INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FDA8C6E01E27F6BF ON reply (question_id)');
        $this->addSql('CREATE INDEX IDX_FDA8C6E0A76ED395 ON reply (user_id)');
        $this->addSql('ALTER TABLE reply ADD CONSTRAINT FK_FDA8C6E01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reply ADD CONSTRAINT FK_FDA8C6E0A76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE response');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE reply_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE response_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE response (id INT NOT NULL, question_id INT NOT NULL, user_id INT NOT NULL, body VARCHAR(255) NOT NULL, upvotes INT NOT NULL, downvotes INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_3e7b0bfb1e27f6bf ON response (question_id)');
        $this->addSql('CREATE INDEX idx_3e7b0bfba76ed395 ON response (user_id)');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT fk_3e7b0bfb1e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT fk_3e7b0bfba76ed395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE reply');
    }
}
