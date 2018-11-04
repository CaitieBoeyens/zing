<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181104091826 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE question_topic_question DROP CONSTRAINT fk_a8e651b17c5d9031');
        $this->addSql('DROP SEQUENCE question_topic_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE tag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE tag (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE question_tag (question_id INT NOT NULL, tag_id INT NOT NULL, PRIMARY KEY(question_id, tag_id))');
        $this->addSql('CREATE INDEX IDX_339D56FB1E27F6BF ON question_tag (question_id)');
        $this->addSql('CREATE INDEX IDX_339D56FBBAD26311 ON question_tag (tag_id)');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FB1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE question_topic_question');
        $this->addSql('DROP TABLE question_topic');
        $this->addSql('ALTER TABLE response ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE response ADD upvotes INT NOT NULL');
        $this->addSql('ALTER TABLE response ADD downvotes INT NOT NULL');
        $this->addSql('ALTER TABLE response DROP user_name');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFBA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3E7B0BFBA76ED395 ON response (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question_tag DROP CONSTRAINT FK_339D56FBBAD26311');
        $this->addSql('DROP SEQUENCE tag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE question_topic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE question_topic_question (question_topic_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(question_topic_id, question_id))');
        $this->addSql('CREATE INDEX idx_a8e651b17c5d9031 ON question_topic_question (question_topic_id)');
        $this->addSql('CREATE INDEX idx_a8e651b11e27f6bf ON question_topic_question (question_id)');
        $this->addSql('CREATE TABLE question_topic (id INT NOT NULL, tag VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT fk_a8e651b17c5d9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT fk_a8e651b11e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE question_tag');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFBA76ED395');
        $this->addSql('DROP INDEX IDX_3E7B0BFBA76ED395');
        $this->addSql('ALTER TABLE response ADD user_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE response DROP user_id');
        $this->addSql('ALTER TABLE response DROP upvotes');
        $this->addSql('ALTER TABLE response DROP downvotes');
    }
}
