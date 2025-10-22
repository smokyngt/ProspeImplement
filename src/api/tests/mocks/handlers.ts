import { rest } from 'msw';
import { CreateAssistantRequest } from '../../src/resources/assistants/types';
import { Assistant } from '../../src/resources/assistants/types';

const assistants: Assistant[] = [];

export const handlers = [
  rest.post('/v1/assistants/new', (req, res, ctx) => {
    const { name }: CreateAssistantRequest = req.body;

    const newAssistant: Assistant = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name,
      createdAt: Date.now(),
      createdBy: '123e4567-e89b-12d3-a456-426614174000',
      object: 'assistant',
      organization: '123e4567-e89b-12d3-a456-426614174000',
    };

    assistants.push(newAssistant);

    return res(
      ctx.status(200),
      ctx.json({
        event: { code: 'assistant.created' },
        timestamp: Date.now(),
        data: { assistant: newAssistant },
      })
    );
  }),

  rest.get('/v1/assistants/:id', (req, res, ctx) => {
    const { id } = req.params;
    const assistant = assistants.find((a) => a.id === id);

    if (!assistant) {
      return res(ctx.status(404), ctx.json({ message: 'Assistant not found' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        event: { code: 'assistants.retrieved' },
        timestamp: Date.now(),
        data: { assistant },
      })
    );
  }),
];