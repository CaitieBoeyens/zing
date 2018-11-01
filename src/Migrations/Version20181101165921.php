<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181101165921 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE question_question_topic DROP CONSTRAINT fk_458b5ae67c5d9031');
        $this->addSql('DROP SEQUENCE question_topic_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE tag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE question_tag (question_id INT NOT NULL, tag_id INT NOT NULL, PRIMARY KEY(question_id, tag_id))');
        $this->addSql('CREATE INDEX IDX_339D56FB1E27F6BF ON question_tag (question_id)');
        $this->addSql('CREATE INDEX IDX_339D56FBBAD26311 ON question_tag (tag_id)');
        $this->addSql('CREATE TABLE tag (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FB1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_tag ADD CONSTRAINT FK_339D56FBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE question_topic');
        $this->addSql('DROP TABLE question_question_topic');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question_tag DROP CONSTRAINT FK_339D56FBBAD26311');
        $this->addSql('DROP SEQUENCE tag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE question_topic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE question_topic (id INT NOT NULL, topic_name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE question_question_topic (question_id INT NOT NULL, question_topic_id INT NOT NULL, PRIMARY KEY(question_id, question_topic_id))');
        $this->addSql('CREATE INDEX idx_458b5ae67c5d9031 ON question_question_topic (question_topic_id)');
        $this->addSql('CREATE INDEX idx_458b5ae61e27f6bf ON question_question_topic (question_id)');
        $this->addSql('ALTER TABLE question_question_topic ADD CONSTRAINT fk_458b5ae61e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_question_topic ADD CONSTRAINT fk_458b5ae67c5d9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE question_tag');
        $this->addSql('DROP TABLE tag');
    }
}
