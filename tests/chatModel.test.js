// Importe as bibliotecas necessárias para testar
const test = require('japa');
const { setupTest, cleanupTest } = require('@indicative/testing');
const Chat = require('../models/chatModel');

// Configuração e limpeza dos testes
test.group('Chat Model', (group) => {
  setupTest(group);
  cleanupTest(group);

  // Teste para criar um novo chat
  test('create a new chat', async (assert) => {
    const userId = 'user123';

    // Crie um novo chat
    const chat = new Chat(null, userId, []);
    await chat.save();

    // Verifique se o chat foi criado com sucesso
    assert.exists(chat.id);
    assert.equal(chat.userId, userId);
    assert.isArray(chat.messages);
    assert.isTrue(chat.createdAt instanceof Date);
    assert.isTrue(chat.updatedAt instanceof Date);
  });

  // Teste para obter ou criar um chat por UserId
  test('get or create chat by UserId', async (assert) => {
    const userId = 'user456';

    // Tente obter um chat existente
    const existingChat = await Chat.getOrCreateByUserId(userId);

    // Verifique se um chat existente foi retornado
    assert.exists(existingChat.id);
    assert.equal(existingChat.userId, userId);
    assert.isArray(existingChat.messages);
    assert.isTrue(existingChat.createdAt instanceof Date);
    assert.isTrue(existingChat.updatedAt instanceof Date);

    // Tente criar um novo chat se não existir
    const newChat = await Chat.getOrCreateByUserId('nonExistentUser');

    // Verifique se um novo chat foi criado
    assert.exists(newChat.id);
    assert.equal(newChat.userId, 'nonExistentUser');
    assert.isArray(newChat.messages);
    assert.isTrue(newChat.createdAt instanceof Date);
    assert.isTrue(newChat.updatedAt instanceof Date);
  });
});
