package com.example.model;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.dao.PersonRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PersonRepositoryTest {

	@Autowired
	private PersonRepository personRepository;

	@Before
	public void setUp() throws Exception {

		Person person = new Person();
		person.setFirstName("firstName");
		person.setLastName("lastName");
		List<Person> personTest = personRepository.findByLastName("lastName");
		personRepository.delete(personTest);
	}

	@Test
	public void testPerson() {

		List<Person> personTest = null;

		Person person = new Person();
		person.setFirstName("firstName");
		person.setLastName("lastName");

		this.personRepository.save(person);

		personTest = personRepository.findByLastName("lastName");

		assertThat(personTest.size()).isEqualTo(1);
		assertThat(personTest.iterator().next().getFirstName()).isEqualTo("firstName");
		assertThat(personTest.iterator().next().getLastName()).isEqualTo("lastName");

		this.personRepository.delete(person);

		personTest = personRepository.findByLastName("lastName");

		assertThat(personTest.size()).isEqualTo(0);
	}

}
