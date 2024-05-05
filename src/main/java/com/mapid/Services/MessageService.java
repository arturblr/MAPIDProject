package com.mapid.Services;

import com.mapid.Entities.Message;
import com.mapid.Repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message save(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAll() {
        return messageRepository.findAll();
    }

    public void delete(int id) {
        messageRepository.deleteById(id);
    }
}
