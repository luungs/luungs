<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Task;
use App\Models\Test;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $assignment = Assignment::create([
                'title' => "Тест по медицине $i",
                'description' => "Тестовые вопросы по медицинским темам $i.",
                'rating' => rand(1, 5),
                'type' => 'test',
            ]);

            $questions = [
                [
                    'question' => 'Что является нормальной температурой тела у взрослого человека?',
                    'a' => '36.6°C',
                    'b' => '37.5°C',
                    'c' => '35.0°C',
                    'd' => '38.0°C',
                    'correct_answer' => 'a',
                ],
                [
                    'question' => 'Какой витамин важен для свертываемости крови?',
                    'a' => 'Витамин D',
                    'b' => 'Витамин C',
                    'c' => 'Витамин K',
                    'd' => 'Витамин A',
                    'correct_answer' => 'c',
                ],
                [
                    'question' => 'Какой орган отвечает за фильтрацию крови?',
                    'a' => 'Печень',
                    'b' => 'Почки',
                    'c' => 'Сердце',
                    'd' => 'Легкие',
                    'correct_answer' => 'b',
                ],
                [
                    'question' => 'Что вызывает инфекционное заболевание грипп?',
                    'a' => 'Бактерии',
                    'b' => 'Грибки',
                    'c' => 'Вирусы',
                    'd' => 'Паразиты',
                    'correct_answer' => 'c',
                ],
                [
                    'question' => 'Какая группа крови является универсальным донором?',
                    'a' => 'A',
                    'b' => 'B',
                    'c' => 'AB',
                    'd' => 'O',
                    'correct_answer' => 'd',
                ],
            ];

            foreach ($questions as $q) {
                Test::create([
                    'assignment_id' => $assignment->id,
                    'question' => $q['question'],
                    'a' => $q['a'],
                    'b' => $q['b'],
                    'c' => $q['c'],
                    'd' => $q['d'],
                    'correct_answer' => $q['correct_answer'],
                ]);
            }
        }

        for ($i = 1; $i <= 5; $i++) {
            $assignment = Assignment::create([
                'title' => "Практическое задание по медицине $i",
                'description' => "Практические задания по медицинским темам $i.",
                'rating' => rand(1, 5),
                'type' => 'task',
            ]);

            $tasks = [
                'Опишите порядок действий при оказании первой помощи при ожогах.',
                'Как следует накладывать повязку при открытом переломе ноги?',
                'Какие основные симптомы у пациента с сердечным приступом?',
                'Опишите действия при сердечно-легочной реанимации взрослого человека.',
                'Как проводится дезинфекция хирургических инструментов?',
            ];

            foreach ($tasks as $task) {
                Task::create([
                    'assignment_id' => $assignment->id,
                    'question' => $task,
                ]);
            }
        }
    }
}
